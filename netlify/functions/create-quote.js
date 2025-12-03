// Fixed Netlify function for creating quotes in HubSpot
// Ultra-simple version that avoids association issues during quote creation

const HUBSPOT_API_BASE = "https://api.hubapi.com";

// ✅ ADD THIS: Your HubSpot Owner ID
const HUBSPOT_OWNER_ID = "160148205";

// ======= Helper: HubSpot API request =======
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

// ======= Create or Update Contact =======
async function createOrUpdateContact(contactInfo) {
  const contactData = {
    properties: {
      firstname: contactInfo.firstName,
      lastname: contactInfo.lastName,
      email: contactInfo.email,
      phone: contactInfo.phone || "",
      company: contactInfo.company || "",
      hs_lead_status: "NEW",
      // ✅ ADDED: Assign owner to contact
      hubspot_owner_id: HUBSPOT_OWNER_ID,
    },
  };

  try {
    // Try to find existing contact by email
    const searchResponse = await hubspotRequest("/crm/v3/objects/contacts/search", {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: "email",
            operator: "EQ",
            value: contactInfo.email,
          }],
        }],
      }),
    });

    if (searchResponse.results?.length > 0) {
      // Update existing contact
      const contactId = searchResponse.results[0].id;
      return await hubspotRequest(`/crm/v3/objects/contacts/${contactId}`, {
        method: "PATCH",
        body: JSON.stringify(contactData),
      });
    } else {
      // Create new contact
      return await hubspotRequest("/crm/v3/objects/contacts", {
        method: "POST",
        body: JSON.stringify(contactData),
      });
    }
  } catch (error) {
    console.error("Error creating/updating contact:", error);
    throw error;
  }
}

// ======= Create or Update Company =======
async function createOrUpdateCompany(companyName, contactId) {
  if (!companyName) return null;

  const companyData = {
    properties: {
      name: companyName,
      domain: "",
      industry: "INFORMATION_TECHNOLOGY_AND_SERVICES",
      // ✅ ADDED: Assign owner to company
      hubspot_owner_id: HUBSPOT_OWNER_ID,
    },
  };

  try {
    // Try to find existing company by name
    const searchResponse = await hubspotRequest("/crm/v3/objects/companies/search", {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: "name",
            operator: "EQ",
            value: companyName,
          }],
        }],
      }),
    });

    let company;
    if (searchResponse.results?.length > 0) {
      company = searchResponse.results[0];
    } else {
      company = await hubspotRequest("/crm/v3/objects/companies", {
        method: "POST",
        body: JSON.stringify(companyData),
      });
    }

    // Associate contact with company
    if (contactId && company.id) {
      await hubspotRequest(`/crm/v4/objects/contacts/${contactId}/associations/default/companies/${company.id}`, {
        method: "PUT",
      });
    }

    return company;
  } catch (error) {
    console.error("Error creating/updating company:", error);
    return null;
  }
}

// ======= Create Deal =======
async function createDeal(contactId, companyId, quoteData) {
  const dealData = {
    properties: {
      dealname: `Hardware Quote - ${quoteData.contactInfo.firstName} ${quoteData.contactInfo.lastName}`,
      amount: quoteData.quoteTotalAmount.toString(),
      dealstage: "qualifiedtobuy",
      pipeline: "default",
      closedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      // ✅ ADDED: Assign owner to deal
      hubspot_owner_id: HUBSPOT_OWNER_ID,
    },
  };

  const deal = await hubspotRequest("/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify(dealData),
  });

  // Associate deal with contact
  if (contactId) {
    await hubspotRequest(`/crm/v4/objects/deals/${deal.id}/associations/default/contacts/${contactId}`, {
      method: "PUT",
    });
  }

  // Associate deal with company
  if (companyId) {
    await hubspotRequest(`/crm/v4/objects/deals/${deal.id}/associations/default/companies/${companyId}`, {
      method: "PUT",
    });
  }

  return deal;
}

// ======= Create Line Items =======
async function createLineItems(selectedItems, dealId) {
  const lineItems = [];

  for (const item of selectedItems) {
    const lineItemData = {
      properties: {
        name: item.itemName,
        quantity: item.quantity.toString(),
        price: item.unitPrice.toString(),
        amount: item.lineTotal.toString(),
        hs_sku: item.sku || "",
        description: `${item.itemCategory} - ${item.purchaseOption === "rent" ? "Monthly Rental" : "Purchase"}`,
        hs_product_id: item.itemId,
      },
    };

    const associations = dealId ? [{
      to: { id: dealId },
      types: [{
        associationCategory: "HUBSPOT_DEFINED",
        associationTypeId: 20,
      }],
    }] : [];

    try {
      const lineItem = await hubspotRequest("/crm/v3/objects/line_items", {
        method: "POST",
        body: JSON.stringify({ ...lineItemData, associations }),
      });
      lineItems.push(lineItem);
    } catch (error) {
      console.error(`Error creating line item for ${item.itemName}:`, error);
    }
  }

  return lineItems;
}

// ======= Create Quote (Ultra-Simple Version) =======
async function createQuote(quoteData, contactId, companyId, dealId, lineItems) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  const quoteRequestData = {
    properties: {
      hs_title: `Hardware Quote - ${quoteData.quoteId}`,
      hs_expiration_date: expirationDate.toISOString().split("T")[0],
      hs_esign_enabled: "true",
      hs_language: "en",
      hs_status: "DRAFT",
      hs_quote_number: quoteData.quoteId,
      hs_terms: quoteData.contactInfo.message || "Standard terms and conditions apply.",
      // ✅ ADDED: Assign owner to quote - THIS IS THE KEY PROPERTY FOR "YOUR INFO"
      hs_quote_owner_id: HUBSPOT_OWNER_ID,
    },
  };

  // Create quote without any associations first
  console.log("Creating quote without associations...");
  const quote = await hubspotRequest("/crm/v3/objects/quotes", {
    method: "POST",
    body: JSON.stringify(quoteRequestData),
  });

  console.log(`Quote created successfully: ${quote.id}`);

  // Add associations after quote creation using v4 API
  try {
    if (contactId) {
      await hubspotRequest(`/crm/v4/objects/quotes/${quote.id}/associations/default/contacts/${contactId}`, {
        method: "PUT",
      });
      console.log(`Associated quote ${quote.id} with contact ${contactId}`);
    }

    if (dealId) {
      await hubspotRequest(`/crm/v4/objects/quotes/${quote.id}/associations/default/deals/${dealId}`, {
        method: "PUT",
      });
      console.log(`Associated quote ${quote.id} with deal ${dealId}`);
    }

    if (companyId) {
      await hubspotRequest(`/crm/v4/objects/quotes/${quote.id}/associations/default/companies/${companyId}`, {
        method: "PUT",
      });
      console.log(`Associated quote ${quote.id} with company ${companyId}`);
    }

    // Associate line items
    for (const lineItem of lineItems) {
      try {
        await hubspotRequest(`/crm/v4/objects/quotes/${quote.id}/associations/default/line_items/${lineItem.id}`, {
          method: "PUT",
        });
      } catch (error) {
        console.error(`Error associating line item ${lineItem.id} with quote:`, error);
      }
    }

    console.log(`Associated ${lineItems.length} line items with quote ${quote.id}`);

  } catch (error) {
    console.error("Error creating associations:", error);
    // Quote is still created successfully, just associations might have failed
  }

  return quote;
}

// ======= Trigger Signature Workflow =======
async function triggerSignatureWorkflow(quoteId) {
  try {
    await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
      method: "PATCH",
      body: JSON.stringify({ properties: { hs_status: "PENDING_APPROVAL" } }),
    });
    console.log(`Quote ${quoteId} status updated to PENDING_APPROVAL`);
  } catch (error) {
    console.error("Error updating quote status:", error);
  }
}

// ======= Netlify Function Handler =======
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    if (!data.contactInfo || !data.selectedItems?.length) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "Missing required quote data" })
      };
    }

    console.log(`Creating quote ${data.quoteId} for ${data.contactInfo.email}`);

    const contact = await createOrUpdateContact(data.contactInfo);
    console.log(`Contact created/updated: ${contact.id}`);

    const company = data.contactInfo.company ? await createOrUpdateCompany(data.contactInfo.company, contact.id) : null;
    if (company) {
      console.log(`Company created/updated: ${company.id}`);
    }

    const deal = await createDeal(contact.id, company?.id, data);
    console.log(`Deal created: ${deal.id}`);

    const lineItems = await createLineItems(data.selectedItems, deal.id);
    console.log(`Created ${lineItems.length} line items`);

    const quote = await createQuote(data, contact.id, company?.id, deal.id, lineItems);
    console.log(`Quote created: ${quote.id}`);

    await triggerSignatureWorkflow(quote.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Quote created successfully in HubSpot",
        data: {
          quoteId: quote.id,
          contactId: contact.id,
          companyId: company?.id || null,
          dealId: deal.id,
          lineItemCount: lineItems.length,
          hubspotQuoteUrl: `https://app.hubspot.com/contacts/${process.env.HUBSPOT_PORTAL_ID || "your-portal"}/objects/0-14/${quote.id}`,
        },
      })
    };

  } catch (err) {
    console.error("Error creating quote:", err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: err.message,
        details: "Check Netlify function logs for more information"
      })
    };
  }
};
