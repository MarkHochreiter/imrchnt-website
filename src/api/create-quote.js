// Serverless function to create quotes in HubSpot with line items and associations
// This can be deployed to Vercel, Netlify, or AWS Lambda

const HUBSPOT_API_BASE = ''https://api.hubapi.com'';

// Helper function to make HubSpot API requests
async function hubspotRequest(endpoint, options = {}) {
  const url = `${HUBSPOT_API_BASE}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HubSpot API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// Create or update contact in HubSpot
async function createOrUpdateContact(contactInfo) {
  const contactData = {
    properties: {
      firstname: contactInfo.firstName,
      lastname: contactInfo.lastName,
      email: contactInfo.email,
      phone: contactInfo.phone || '',
      company: contactInfo.company || '',
      hs_lead_status: 'NEW'
    }
  };

  try {
    // Try to find existing contact by email
    const searchResponse = await hubspotRequest('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: contactInfo.email
          }]
        }]
      })
    });

    if (searchResponse.results && searchResponse.results.length > 0) {
      // Update existing contact
      const contactId = searchResponse.results[0].id;
      const updateResponse = await hubspotRequest(`/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        body: JSON.stringify(contactData)
      });
      return updateResponse;
    } else {
      // Create new contact
      const createResponse = await hubspotRequest('/crm/v3/objects/contacts', {
        method: 'POST',
        body: JSON.stringify(contactData)
      });
      return createResponse;
    }
  } catch (error) {
    console.error('Error creating/updating contact:', error);
    throw error;
  }
}

// Create or update company in HubSpot
async function createOrUpdateCompany(companyName, contactId) {
  if (!companyName) return null;

  const companyData = {
    properties: {
      name: companyName,
      domain: '', // Could be extracted from email domain if needed
      industry: 'Technology' // Default industry
    }
  };

  try {
    // Try to find existing company by name
    const searchResponse = await hubspotRequest('/crm/v3/objects/companies/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'name',
            operator: 'EQ',
            value: companyName
          }]
        }]
      })
    });

    let company;
    if (searchResponse.results && searchResponse.results.length > 0) {
      // Use existing company
      company = searchResponse.results[0];
    } else {
      // Create new company
      company = await hubspotRequest('/crm/v3/objects/companies', {
        method: 'POST',
        body: JSON.stringify(companyData)
      });
    }

    // Associate contact with company
    if (contactId && company.id) {
      await hubspotRequest(`/crm/v4/objects/contacts/${contactId}/associations/default/companies/${company.id}`, {
        method: 'PUT'
      });
    }

    return company;
  } catch (error) {
    console.error('Error creating/updating company:', error);
    // Don't throw error for company creation failure
    return null;
  }
}

// Create deal for the quote
async function createDeal(contactId, companyId, quoteData) {
  const dealData = {
    properties: {
      dealname: `Hardware Quote - ${quoteData.contactInfo.firstName} ${quoteData.contactInfo.lastName}`,
      amount: quoteData.quoteTotalAmount.toString(),
      dealstage: 'qualifiedtobuy', // Default deal stage
      pipeline: 'default', // Default pipeline
      closedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      hubspot_owner_id: process.env.HUBSPOT_DEFAULT_OWNER_ID || '' // Optional: set default owner
    }
  };

  try {
    const deal = await hubspotRequest('/crm/v3/objects/deals', {
      method: 'POST',
      body: JSON.stringify(dealData)
    });

    // Associate deal with contact
    if (contactId) {
      await hubspotRequest(`/crm/v4/objects/deals/${deal.id}/associations/default/contacts/${contactId}`, {
        method: 'PUT'
      });
    }

    // Associate deal with company
    if (companyId) {
      await hubspotRequest(`/crm/v4/objects/deals/${deal.id}/associations/default/companies/${companyId}`, {
        method: 'PUT'
      });
    }

    return deal;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
}

// Create line items from selected products
async function createLineItems(selectedItems, dealId) {
  const lineItems = [];

  for (const item of selectedItems) {
    const lineItemData = {
      properties: {
        name: item.itemName,
        quantity: item.quantity.toString(),
        price: item.unitPrice.toString(),
        amount: item.lineTotal.toString(),
        hs_sku: item.sku || '',
        description: `${item.itemCategory} - ${item.purchaseOption === 'rent' ? 'Monthly Rental' : 'Purchase'}`,
        hs_product_id: item.itemId // Reference to original product if available
      }
    };

    // Add associations if deal exists
    const associations = dealId ? [{
      to: { id: dealId },
      types: [{
        associationCategory: 'HUBSPOT_DEFINED',
        associationTypeId: 20 // Line item to deal association
      }]
    }] : [];

    try {
      const lineItem = await hubspotRequest('/crm/v3/objects/line_items', {
        method: 'POST',
        body: JSON.stringify({
          ...lineItemData,
          associations
        })
      });

      lineItems.push(lineItem);
    } catch (error) {
      console.error(`Error creating line item for ${item.itemName}:`, error);
      // Continue with other line items even if one fails
    }
  }

  return lineItems;
}

// Create quote in HubSpot
async function createQuote(quoteData, contactId, companyId, dealId, lineItems) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // 30 days from now

  const quoteRequestData = {
    properties: {
      hs_title: `Hardware Quote - ${quoteData.quoteId}`,
      hs_expiration_date: expirationDate.toISOString().split('T')[0],
      hs_esign_enabled: 'true', // Enable e-signatures
      hs_status: 'DRAFT', // Start as draft
      hs_quote_amount: quoteData.quoteTotalAmount.toString(),
      hs_quote_number: quoteData.quoteId,
      hs_terms: quoteData.contactInfo.message || 'Standard terms and conditions apply.'
    }
  };

  // Add associations
  const associations = [];
  
  if (contactId) {
    associations.push({
      to: { id: contactId },
      types: [{
        associationCategory: 'HUBSPOT_DEFINED',
        associationTypeId: 200 // Quote to contact association
      }]
    });
  }

  if (companyId) {
    associations.push({
      to: { id: companyId },
      types: [{
        associationCategory: 'HUBSPOT_DEFINED',
        associationTypeId: 202 // Quote to company association
      }]
    });
  }

  if (dealId) {
    associations.push({
      to: { id: dealId },
      types: [{
        associationCategory: 'HUBSPOT_DEFINED',
        associationTypeId: 201 // Quote to deal association
      }]
    });
  }

  // Associate with line items
  lineItems.forEach(lineItem => {
    associations.push({
      to: { id: lineItem.id },
      types: [{
        associationCategory: 'HUBSPOT_DEFINED',
        associationTypeId: 203 // Quote to line item association
      }]
    });
  });

  try {
    const quote = await hubspotRequest('/crm/v3/objects/quotes', {
      method: 'POST',
      body: JSON.stringify({
        ...quoteRequestData,
        associations
      })
    });

    return quote;
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
}

// Trigger workflow to send quote for signature
async function triggerSignatureWorkflow(quoteId, contactId) {
  // This would typically be done through a HubSpot workflow
  // For now, we'll update the quote status to trigger any existing workflows
  try {
    await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        properties: {
          hs_status: 'PENDING_APPROVAL' // This status change can trigger workflows
        }
      })
    });

    console.log(`Quote ${quoteId} status updated to trigger signature workflow`);
  } catch (error) {
    console.error('Error triggering signature workflow:', error);
    // Don't throw error as quote creation was successful
  }
}

// Main handler function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for required environment variable
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is not set');
    }

    const quoteData = req.body;

    // Validate required data
    if (!quoteData.contactInfo || !quoteData.selectedItems || quoteData.selectedItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required quote data'
      });
    }

    console.log(`Creating quote ${quoteData.quoteId} for ${quoteData.contactInfo.email}`);

    // Step 1: Create or update contact
    const contact = await createOrUpdateContact(quoteData.contactInfo);
    console.log(`Contact created/updated: ${contact.id}`);

    // Step 2: Create or update company (if provided)
    let company = null;
    if (quoteData.contactInfo.company) {
      company = await createOrUpdateCompany(quoteData.contactInfo.company, contact.id);
      if (company) {
        console.log(`Company created/updated: ${company.id}`);
      }
    }

    // Step 3: Create deal
    const deal = await createDeal(contact.id, company?.id, quoteData);
    console.log(`Deal created: ${deal.id}`);

    // Step 4: Create line items
    const lineItems = await createLineItems(quoteData.selectedItems, deal.id);
    console.log(`Created ${lineItems.length} line items`);

    // Step 5: Create quote with all associations
    const quote = await createQuote(quoteData, contact.id, company?.id, deal.id, lineItems);
    console.log(`Quote created: ${quote.id}`);

    // Step 6: Trigger signature workflow
    await triggerSignatureWorkflow(quote.id, contact.id);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Quote created successfully in HubSpot',
      data: {
        quoteId: quote.id,
        contactId: contact.id,
        companyId: company?.id,
        dealId: deal.id,
        lineItemCount: lineItems.length,
        hubspotQuoteUrl: `https://app.hubspot.com/contacts/${process.env.HUBSPOT_PORTAL_ID || 'your-portal'}/objects/0-14/${quote.id}`
      }
    });

  } catch (error) {
    console.error('Error creating quote in HubSpot:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to create quote in HubSpot',
      message: error.message
    });
  }
}

// Alternative export for different serverless platforms
module.exports = handler;
