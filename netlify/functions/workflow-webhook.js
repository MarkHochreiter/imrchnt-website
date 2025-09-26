// Webhook handler for HubSpot custom workflow actions
import fetch from "node-fetch";

const HUBSPOT_API_BASE = "https://api.hubapi.com";

// ======= Helper =======
async function hubspotRequest(endpoint, options = {}) {
  const url = `${HUBSPOT_API_BASE}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HubSpot API error: ${response.status} - ${errText}`);
  }
  return response.json();
}

function validateHubSpotSignature(req) {
  const sig = req.headers["x-hubspot-signature-v2"];
  if (!sig) throw new Error("Missing HubSpot signature");
  return true; // Add real signature verification in production
}

// ======= Core Processing =======
async function processSignedQuote(quoteId, contactId) {
  const results = {
    quoteProcessed: false,
    inventoryUpdated: false,
    deliveryScheduled: false,
    notificationsSent: false,
    errors: [],
  };

  try {
    const quote = await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`);
    const lineItemsResp = await hubspotRequest(
      `/crm/v4/objects/quotes/${quoteId}/associations/line_items`
    );

    const lineItemIds = lineItemsResp.results?.map((li) => li.toObjectId) || [];

    // Parallel fetch line items
    const lineItems = await Promise.allSettled(
      lineItemIds.map((id) =>
        hubspotRequest(`/crm/v3/objects/line_items/${id}`).catch((err) => {
          results.errors.push(`Line item ${id} error: ${err.message}`);
          return null;
        })
      )
    );
    const validLineItems = lineItems.filter((r) => r.status === "fulfilled").map((r) => r.value);

    // Update quote status
    await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
      method: "PATCH",
      body: JSON.stringify({
        properties: {
          hs_status: "PROCESSING",
          processing_date: new Date().toISOString(),
          fulfillment_status: "PENDING",
        },
      }),
    });
    results.quoteProcessed = true;

    // Inventory update
    try {
      await updateInventoryForLineItems(validLineItems);
      results.inventoryUpdated = true;
    } catch (err) {
      results.errors.push("Inventory update failed: " + err.message);
    }

    // Delivery scheduling
    try {
      const deliveryInfo = await scheduleDeliveryForQuote(quote, contactId, validLineItems);
      await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          properties: {
            estimated_delivery_date: deliveryInfo.estimatedDate,
            delivery_method: deliveryInfo.method,
            tracking_number: deliveryInfo.trackingNumber || "",
          },
        }),
      });
      results.deliveryScheduled = true;
    } catch (err) {
      results.errors.push("Delivery scheduling failed: " + err.message);
    }

    // Notifications
    try {
      await sendProcessingNotifications(quote, contactId, validLineItems);
      results.notificationsSent = true;
    } catch (err) {
      results.errors.push("Notification sending failed: " + err.message);
    }

    return results;
  } catch (err) {
    results.errors.push("Main processing error: " + err.message);
    return results;
  }
}

// ======= Helper Functions =======
async function updateInventoryForLineItems(lineItems) {
  const promises = lineItems.map(async (item) => {
    const { hs_sku, quantity = "1" } = item.properties;
    if (!hs_sku) return;
    console.log(`Reducing inventory for SKU ${hs_sku} by ${quantity}`);
    await new Promise((res) => setTimeout(res, 100)); // Simulate API delay
  });
  await Promise.all(promises);
}

async function scheduleDeliveryForQuote(quote, contactId, lineItems) {
  const contact = await hubspotRequest(`/crm/v3/objects/contacts/${contactId}`);
  const hasTerminals = lineItems.some(
    (item) =>
      item.properties.description?.includes("Terminal") ||
      item.properties.name?.includes("Terminal")
  );

  const deliveryDays = hasTerminals ? 7 : 3;
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + deliveryDays);

  return {
    estimatedDate: estimatedDate.toISOString().split("T")[0],
    method: hasTerminals ? "WHITE_GLOVE" : "STANDARD_SHIPPING",
    trackingNumber: `HW${Date.now()}${Math.floor(Math.random() * 1000)}`,
  };
}

async function sendProcessingNotifications(quote, contactId, lineItems) {
  await hubspotRequest("/crm/v3/objects/tasks", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_task_subject: `Process Hardware Order - ${quote.properties.hs_title}`,
        hs_task_body: `
Quote ${quote.properties.hs_quote_number} has been signed.
Items to fulfill:
${lineItems.map((item) => `- ${item.properties.name} (Qty: ${item.properties.quantity})`).join("\n")}
Total Value: $${quote.properties.hs_quote_amount}
Next steps:
1. Verify inventory
2. Prepare items
3. Schedule delivery
4. Update customer
        `,
        hs_task_status: "NOT_STARTED",
        hs_task_priority: "HIGH",
        hs_task_type: "TODO",
        hs_timestamp: new Date().toISOString(),
      },
      associations: [
        {
          to: { id: quote.id },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 204 }],
        },
      ],
    }),
  });
}

async function handleQuoteExpiration(quoteId) {
  await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
    method: "PATCH",
    body: JSON.stringify({
      properties: {
        hs_status: "EXPIRED",
        expiration_processed_date: new Date().toISOString(),
      },
    }),
  });
  await hubspotRequest("/crm/v3/objects/tasks", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_task_subject: `Follow up on expired quote`,
        hs_task_body: `Quote has expired. Consider follow-up.`,
        hs_task_status: "NOT_STARTED",
        hs_task_priority: "MEDIUM",
        hs_timestamp: new Date().toISOString(),
      },
      associations: [
        {
          to: { id: quoteId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 204 }],
        },
      ],
    }),
  });
  return { success: true, message: "Quote expiration processed" };
}

// ======= Main Handler =======
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-HubSpot-Signature-V2");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    validateHubSpotSignature(req);
    const { actionType, objectId, contactId } = req.body;
    console.log("Received webhook:", { actionType, objectId, contactId });

    let result;
    if (actionType === "PROCESS_SIGNED_QUOTE") result = await processSignedQuote(objectId, contactId);
    else if (actionType === "HANDLE_QUOTE_EXPIRATION") result = await handleQuoteExpiration(objectId);
    else return res.status(400).json({ success: false, error: `Unknown action type: ${actionType}` });

    res.status(200).json({
      success: true,
      actionType,
      objectId,
      result,
      outputFields: {
        processing_status: result.errors.length === 0 ? "SUCCESS" : "PARTIAL_SUCCESS",
        errors_count: result.errors.length,
        processed_timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ success: false, error: "Webhook processing failed", message: error.message });
  }
}

export default handler;

