// create-quote.js — Netlify Serverless Function

const HUBSPOT_API_BASE = "https://api.hubapi.com";

// Helper: HubSpot API request
async function hubspotRequest(endpoint, options = {}) {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    throw new Error("Missing HUBSPOT_ACCESS_TOKEN environment variable");
  }

  const url = `${HUBSPOT_API_BASE}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HubSpot API error: ${res.status} - ${errorText}`);
  }
  return res.json();
}

// Create or update a HubSpot contact
async function createOrUpdateContact(info) {
  const contactData = {
    properties: {
      firstname: info.firstName,
      lastname: info.lastName,
      email: info.email,
      phone: info.phone || "",
      company: info.company || "",
      hs_lead_status: "NEW",
    },
  };

  const searchRes = await hubspotRequest("/crm/v3/objects/contacts/search", {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [{ propertyName: "email", operator: "EQ", value: info.email }],
        },
      ],
    }),
  });

  if (searchRes.results?.length) {
    const contactId = searchRes.results[0].id;
    return hubspotRequest(`/crm/v3/objects/contacts/${contactId}`, {
      method: "PATCH",
      body: JSON.stringify(contactData),
    });
  }
  return hubspotRequest("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify(contactData),
  });
}

// Create or update a company
async function createOrUpdateCompany(name, contactId) {
  if (!name) return null;

  const companyData = { properties: { name, industry: "Technology" } };

  const searchRes = await hubspotRequest("/crm/v3/objects/companies/search", {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: "name", operator: "EQ", value: name }] }],
    }),
  });

  let company;
  if (searchRes.results?.length) {
    company = searchRes.results[0];
  } else {
    company = await hubspotRequest("/crm/v3/objects/companies", {
      method: "POST",
      body: JSON.stringify(companyData),
    });
  }

  if (contactId && company?.id) {
    await hubspotRequest(`/crm/v4/objects/contacts/${contactId}/associations/default/companies/${company.id}`, { method: "PUT" });
  }
  return company;
}

// Create a deal
async function createDeal(contactId, companyId, quoteData) {
  const dealData = {
    properties: {
      dealname: `Hardware Quote - ${quoteData.contactInfo.firstName} ${quoteData.contactInfo.lastName}`,
      amount: quoteData.quoteTotalAmount.toString(),
      dealstage: "qualifiedtobuy",
      pipeline: "default",
      closedate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      hubspot_owner_id: process.env.HUBSPOT_DEFAULT_OWNER_ID || "",
    },
  };

  const deal = await hubspotRequest("/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify(dealData),
  });

  if (contactId) {
    await hubspotRequest(`/crm/v4/objects/deals/${deal.id}/associations/default/contacts/${contactId}`, { method: "PUT" });
  }
  if (companyId) {
    await hubspotRequest(`/crm/v4/objects/deals/${deal.id}/associations/default/companies/${companyId}`, { method: "PUT" });
  }

  return deal;
}

// Create line items
async function createLineItems(items, dealId) {
  const results = [];
  for (const item of items) {
    const data = {
      properties: {
        name: item.itemName,
        quantity: item.quantity.toString(),
        price: item.unitPrice.toString(),
        amount: item.lineTotal.toString(),
        hs_sku: item.sku || "",
        description: `${item.itemCategory} - ${item.purchaseOption === "rent" ? "Monthly Rental" : "Purchase"}`,
        hs_product_id: item.itemId || "",
      },
    };

    const associations = dealId
      ? [{ to: { id: dealId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 20 }] }]
      : [];

    try {
      const lineItem = await hubspotRequest("/crm/v3/objects/line_items", {
        method: "POST",
        body: JSON.stringify({ ...data, associations }),
      });
      results.push(lineItem);
    } catch (err) {
      console.error("Line item creation error:", err.message);
    }
  }
  return results;
}

// Create quote
async function createQuote(quoteData, contactId, companyId, dealId, lineItems) {
  const expirationDate = new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0];

  const quoteProps = {
    hs_title: `Hardware Quote - ${quoteData.quoteId}`,
    hs_expiration_date: expirationDate,
    hs_esign_enabled: "true",
    hs_status: "DRAFT",
    hs_quote_amount: quoteData.quoteTotalAmount.toString(),
    hs_quote_number: quoteData.quoteId,
    hs_terms: quoteData.contactInfo.message || "Standard terms and conditions apply.",
  };

  const associations = [];
  if (contactId) associations.push({ to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 200 }] });
  if (companyId) associations.push({ to: { id: companyId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }] });
  if (dealId) associations.push({ to: { id: dealId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 201 }] });
  lineItems.forEach(item => associations.push({ to: { id: item.id }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 203 }] }));

  return hubspotRequest("/crm/v3/objects/quotes", {
    method: "POST",
    body: JSON.stringify({ properties: quoteProps, associations }),
  });
}

// Trigger signature workflow
async function triggerSignatureWorkflow(quoteId) {
  await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
    method: "PATCH",
    body: JSON.stringify({ properties: { hs_status: "PENDING_APPROVAL" } }),
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const data = req.body;
    if (!data.contactInfo || !data.selectedItems?.length) {
      return res.status(400).json({ success: false, error: "Missing required quote data" });
    }

    const contact = await createOrUpdateContact(data.contactInfo);
    const company = data.contactInfo.company ? await createOrUpdateCompany(data.contactInfo.company, contact.id) : null;
    const deal = await createDeal(contact.id, company?.id, data);
    const lineItems = await createLineItems(data.selectedItems, deal.id);
    const quote = await createQuote(data, contact.id, company?.id, deal.id, lineItems);
    await triggerSignatureWorkflow(quote.id);

    return res.status(200).json({
      success: true,
      message: "Quote created successfully",
      data: {
        quoteId: quote.id,
        contactId: contact.id,
        companyId: company?.id,
        dealId: deal.id,
        lineItemCount: lineItems.length,
        hubspotQuoteUrl: `https://app.hubspot.com/contacts/${process.env.HUBSPOT_PORTAL_ID || "your-portal"}/objects/0-14/${quote.id}`,
      },
    });
  } catch (err) {
    console.error("Error creating quote:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
