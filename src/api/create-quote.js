// Debug version of Netlify function for creating quotes in HubSpot
// Added extensive logging to help identify issues

const HUBSPOT_API_BASE = "https://api.hubapi.com";

// ======= Helper: HubSpot API request =======
async function hubspotRequest(endpoint, options = {}) {
  console.log(`Making HubSpot API request to: ${endpoint}`);
  console.log(`Request options:`, JSON.stringify(options, null, 2));

  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    console.error("Missing HUBSPOT_ACCESS_TOKEN environment variable");
    throw new Error("Missing HUBSPOT_ACCESS_TOKEN environment variable");
  }

  const url = `${HUBSPOT_API_BASE}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  console.log(`Request URL: ${url}`);
  console.log(`Request headers:`, JSON.stringify(headers, null, 2));

  const res = await fetch(url, { ...options, headers });
  
  console.log(`Response status: ${res.status}`);
  console.log(`Response headers:`, JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2));

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`HubSpot API error: ${res.status} - ${errorText}`);
    throw new Error(`HubSpot API error: ${res.status} - ${errorText}`);
  }
  
  const responseData = await res.json();
  console.log(`Response data:`, JSON.stringify(responseData, null, 2));
  return responseData;
}

// ======= Create or Update Contact =======
async function createOrUpdateContact(contactInfo) {
  console.log("=== Creating/Updating Contact ===");
  console.log("Contact info:", JSON.stringify(contactInfo, null, 2));

  const contactData = {
    properties: {
      firstname: contactInfo.firstName,
      lastname: contactInfo.lastName,
      email: contactInfo.email,
      phone: contactInfo.phone || "",
      company: contactInfo.company || "",
      hs_lead_status: "NEW",
    },
  };

  try {
    // Try to find existing contact by email
    console.log("Searching for existing contact by email...");
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
      console.log("Found existing contact, updating...");
      const contactId = searchResponse.results[0].id;
      return await hubspotRequest(`/crm/v3/objects/contacts/${contactId}`, {
        method: "PATCH",
        body: JSON.stringify(contactData),
      });
    } else {
      // Create new contact
      console.log("No existing contact found, creating new...");
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
  console.log("=== Creating/Updating Company ===");
  console.log("Company name:", companyName);
  console.log("Contact ID:", contactId);

  if (!companyName) {
    console.log("No company name provided, skipping company creation");
    return null;
  }

  const companyData = {
    properties: {
      name: companyName,
      domain: "",
      industry: "Technology",
    },
  };

  try {
    // Try to find existing company by name
    console.log("Searching for existing company by name...");
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
      console.log("Found existing company");
      company = searchResponse.results[0];
    } else {
      console.log("No existing company found, creating new...");
      company = await hubspotRequest("/crm/v3/objects/companies", {
        method: "POST",
        body: JSON.stringify(companyData),
      });
    }

    // Associate contact with company
    if (contactId && company.id) {
      console.log("Associating contact with company...");
      await hubspotRequest(`/crm/v4/objects/contacts/${contactId}/associations/default/companies/${company.id}`, {
        method: "PUT",
      });
    }

    return company;
  } catch (error) {
    console.error("Error creating/updating company:", error);
    return null; // Don't throw error for company creation failure
  }
}

// ======= Create Deal =======
async function createDeal(contactId, companyId, quoteData) {
  console.log("=== Creating Deal ===");
  console.log("Contact ID:", contactId);
  console.log("Company ID:", companyId);

  const dealData = {
    properties: {
      dealname: `Hardware Quote - ${quoteData.contactInfo.firstName} ${quoteData.contactInfo.lastName}`,
      amount: quoteData.quoteTotalAmount.toString(),
      dealstage: "qualifiedtobuy",
      pipeline: "default",
      closedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      hubspot_owner_id: process.env.HUBSPOT_DEFAULT_OWNER_ID || "",
    },
  };

  console.log("Creating deal with data:", JSON.stringify(dealData, null, 2));

  const deal = await hubspotRequest("/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify(dealData),
  });

  // Associate deal with contact
  if (contactId) {
    console.log("Associating deal with contact...");
    await hubspotRequest(`/crm/v4/objects/deals/${deal.id}/associations/default/contacts/${contactId}`, {
      method: "PUT",
    });
  }

  // Associate deal with company
  if (companyId) {
    console.log("Associating deal with company...");
    await hubspotRequest(`/crm/v4/objects/deals/${deal.id}/associations/default/companies/${companyId}`, {
      method: "PUT",
    });
  }

  return deal;
}

// ======= Create Line Items =======
async function createLineItems(selectedItems, dealId) {
  console.log("=== Creating Line Items ===");
  console.log("Selected items:", JSON.stringify(selectedItems, null, 2));
  console.log("Deal ID:", dealId);

  const lineItems = [];

  for (const item of selectedItems) {
    console.log(`Creating line item for: ${item.itemName}`);

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
      console.log(`Successfully created line item: ${lineItem.id}`);
    } catch (error) {
      console.error(`Error creating line item for ${item.itemName}:`, error);
      // Continue with other line items even if one fails
    }
  }

  return lineItems;
}

// ======= Create Quote =======
async function createQuote(quoteData, contactId, companyId, dealId, lineItems) {
  console.log("=== Creating Quote ===");

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  const quoteRequestData = {
    properties: {
      hs_title: `Hardware Quote - ${quoteData.quoteId}`,
      hs_expiration_date: expirationDate.toISOString().split("T")[0],
      hs_esign_enabled: "true",
      hs_status: "DRAFT",
      hs_quote_amount: quoteData.quoteTotalAmount.toString(),
      hs_quote_number: quoteData.quoteId,
      hs_terms: quoteData.contactInfo.message || "Standard terms and conditions apply.",
    },
  };

  const associations = [];

  if (contactId) {
    associations.push({
      to: { id: contactId },
      types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 200 }],
    });
  }

  if (companyId) {
    associations.push({
      to: { id: companyId },
      types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }],
    });
  }

  if (dealId) {
    associations.push({
      to: { id: dealId },
      types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 201 }],
    });
  }

  lineItems.forEach((lineItem) => {
    associations.push({
      to: { id: lineItem.id },
      types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 203 }],
    });
  });

  console.log("Quote data:", JSON.stringify(quoteRequestData, null, 2));
  console.log("Quote associations:", JSON.stringify(associations, null, 2));

  return await hubspotRequest("/crm/v3/objects/quotes", {
    method: "POST",
    body: JSON.stringify({ ...quoteRequestData, associations }),
  });
}

// ======= Trigger Signature Workflow =======
async function triggerSignatureWorkflow(quoteId) {
  console.log("=== Triggering Signature Workflow ===");
  console.log("Quote ID:", quoteId);

  await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
    method: "PATCH",
    body: JSON.stringify({ properties: { hs_status: "PENDING_APPROVAL" } }),
  });
}

// ======= Netlify Function Handler =======
exports.handler = async (event, context) => {
  console.log("=== NETLIFY FUNCTION CALLED ===");
  console.log("HTTP Method:", event.httpMethod);
  console.log("Headers:", JSON.stringify(event.headers, null, 2));
  console.log("Body:", event.body);
  console.log("Environment variables check:");
  console.log("- HUBSPOT_ACCESS_TOKEN:", process.env.HUBSPOT_ACCESS_TOKEN ? "SET" : "NOT SET");
  console.log("- HUBSPOT_PORTAL_ID:", process.env.HUBSPOT_PORTAL_ID || "NOT SET");

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    console.log("Method not allowed:", event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log("Parsing request body...");
    const data = JSON.parse(event.body);
    console.log("Parsed data:", JSON.stringify(data, null, 2));
    
    if (!data.contactInfo || !data.selectedItems?.length) {
      console.error("Missing required quote data");
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

    const successResponse = {
      success: true,
      message: "Quote created successfully",
      data: {
        quoteId: quote.id,
        contactId: contact.id,
        companyId: company?.id || null,
        dealId: deal.id,
        lineItemCount: lineItems.length,
        hubspotQuoteUrl: `https://app.hubspot.com/contacts/${process.env.HUBSPOT_PORTAL_ID || "your-portal"}/objects/0-14/${quote.id}`,
      },
    };

    console.log("=== SUCCESS ===");
    console.log("Response:", JSON.stringify(successResponse, null, 2));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(successResponse)
    };

  } catch (err) {
    console.error("=== ERROR ===");
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);

    const errorResponse = {
      success: false,
      error: err.message,
      timestamp: new Date().toISOString(),
      stack: err.stack
    };

    console.log("Error response:", JSON.stringify(errorResponse, null, 2));

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(errorResponse)
    };
  }
};
