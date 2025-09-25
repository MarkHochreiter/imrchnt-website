// Webhook handler for HubSpot custom workflow actions
// This handles callbacks from HubSpot workflows for advanced automation

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

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

// Validate HubSpot webhook signature
function validateHubSpotSignature(req) {
  const signature = req.headers['x-hubspot-signature-v2'];
  if (!signature) {
    throw new Error('Missing HubSpot signature');
  }

  // In production, validate the signature using your app secret
  // For now, we'll just check if it exists
  return true;
}

// Process signed quote - main automation logic
async function processSignedQuote(quoteId, contactId) {
  const results = {
    quoteProcessed: false,
    inventoryUpdated: false,
    deliveryScheduled: false,
    notificationsSent: false,
    errors: []
  };

  try {
    // 1. Get quote details
    const quote = await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
      method: 'GET'
    });

    // 2. Get associated line items
    const lineItemsResponse = await hubspotRequest(`/crm/v4/objects/quotes/${quoteId}/associations/line_items`, {
      method: 'GET'
    });

    const lineItemIds = lineItemsResponse.results?.map(item => item.toObjectId) || [];
    
    // 3. Get line item details
    const lineItems = [];
    for (const itemId of lineItemIds) {
      try {
        const lineItem = await hubspotRequest(`/crm/v3/objects/line_items/${itemId}`, {
          method: 'GET'
        });
        lineItems.push(lineItem);
      } catch (error) {
        console.error(`Error fetching line item ${itemId}:`, error);
        results.errors.push(`Failed to fetch line item ${itemId}`);
      }
    }

    // 4. Update quote properties to mark as processed
    await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        properties: {
          hs_status: 'PROCESSING',
          processing_date: new Date().toISOString(),
          fulfillment_status: 'PENDING'
        }
      })
    });
    results.quoteProcessed = true;

    // 5. Process inventory updates (simulate external system integration)
    try {
      await updateInventoryForLineItems(lineItems);
      results.inventoryUpdated = true;
    } catch (error) {
      console.error('Inventory update failed:', error);
      results.errors.push('Inventory update failed');
    }

    // 6. Schedule delivery (simulate external system integration)
    try {
      const deliveryInfo = await scheduleDeliveryForQuote(quote, contactId, lineItems);
      
      // Update quote with delivery information
      await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          properties: {
            estimated_delivery_date: deliveryInfo.estimatedDate,
            delivery_method: deliveryInfo.method,
            tracking_number: deliveryInfo.trackingNumber || ''
          }
        })
      });
      results.deliveryScheduled = true;
    } catch (error) {
      console.error('Delivery scheduling failed:', error);
      results.errors.push('Delivery scheduling failed');
    }

    // 7. Send notifications
    try {
      await sendProcessingNotifications(quote, contactId, lineItems);
      results.notificationsSent = true;
    } catch (error) {
      console.error('Notification sending failed:', error);
      results.errors.push('Notification sending failed');
    }

    return results;

  } catch (error) {
    console.error('Error processing signed quote:', error);
    results.errors.push(`Main processing error: ${error.message}`);
    return results;
  }
}

// Simulate inventory update in external system
async function updateInventoryForLineItems(lineItems) {
  // This would integrate with your actual inventory management system
  console.log('Updating inventory for line items:', lineItems.length);
  
  for (const lineItem of lineItems) {
    const properties = lineItem.properties;
    const sku = properties.hs_sku;
    const quantity = parseInt(properties.quantity || '1');
    
    if (sku) {
      // Simulate API call to inventory system
      console.log(`Reducing inventory for SKU ${sku} by ${quantity} units`);
      
      // In real implementation, you would:
      // await inventoryAPI.reduceStock(sku, quantity);
      
      // For now, we'll just log the action
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
    }
  }
  
  return true;
}

// Simulate delivery scheduling in external system
async function scheduleDeliveryForQuote(quote, contactId, lineItems) {
  // This would integrate with your actual fulfillment/shipping system
  console.log('Scheduling delivery for quote:', quote.id);
  
  // Get contact details for delivery
  const contact = await hubspotRequest(`/crm/v3/objects/contacts/${contactId}`, {
    method: 'GET'
  });
  
  // Calculate estimated delivery date based on line items
  const hasTerminals = lineItems.some(item => 
    item.properties.description?.includes('Terminal') || 
    item.properties.name?.includes('Terminal')
  );
  
  const deliveryDays = hasTerminals ? 7 : 3; // Terminals take longer to deliver
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + deliveryDays);
  
  // Simulate delivery scheduling API call
  const deliveryInfo = {
    estimatedDate: estimatedDate.toISOString().split('T')[0],
    method: hasTerminals ? 'WHITE_GLOVE' : 'STANDARD_SHIPPING',
    trackingNumber: `HW${Date.now()}${Math.floor(Math.random() * 1000)}`
  };
  
  console.log('Delivery scheduled:', deliveryInfo);
  
  // In real implementation, you would:
  // const delivery = await shippingAPI.scheduleDelivery({
  //   customerInfo: contact.properties,
  //   items: lineItems,
  //   priority: hasTerminals ? 'high' : 'standard'
  // });
  
  return deliveryInfo;
}

// Send processing notifications
async function sendProcessingNotifications(quote, contactId, lineItems) {
  console.log('Sending processing notifications for quote:', quote.id);
  
  // Create internal task for fulfillment team
  await hubspotRequest('/crm/v3/objects/tasks', {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        hs_task_subject: `Process Hardware Order - ${quote.properties.hs_title}`,
        hs_task_body: `
          Quote ${quote.properties.hs_quote_number} has been signed and needs processing.
          
          Items to fulfill:
          ${lineItems.map(item => `- ${item.properties.name} (Qty: ${item.properties.quantity})`).join('\n')}
          
          Total Value: $${quote.properties.hs_quote_amount}
          
          Next steps:
          1. Verify inventory availability
          2. Prepare items for shipment
          3. Schedule delivery/installation
          4. Update customer with tracking info
        `,
        hs_task_status: 'NOT_STARTED',
        hs_task_priority: 'HIGH',
        hs_task_type: 'TODO',
        hs_timestamp: new Date().toISOString()
      },
      associations: [{
        to: { id: quote.id },
        types: [{
          associationCategory: 'HUBSPOT_DEFINED',
          associationTypeId: 204 // Task to quote association
        }]
      }]
    })
  });
  
  // In a real implementation, you might also:
  // - Send email to fulfillment team
  // - Create tickets in external systems
  // - Update ERP systems
  // - Send SMS notifications for urgent orders
  
  return true;
}

// Handle quote expiration
async function handleQuoteExpiration(quoteId) {
  try {
    // Update quote status
    await hubspotRequest(`/crm/v3/objects/quotes/${quoteId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        properties: {
          hs_status: 'EXPIRED',
          expiration_processed_date: new Date().toISOString()
        }
      })
    });

    // Create follow-up task
    await hubspotRequest('/crm/v3/objects/tasks', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          hs_task_subject: `Follow up on expired quote`,
          hs_task_body: `Quote has expired. Consider reaching out to customer to renew or create new quote.`,
          hs_task_status: 'NOT_STARTED',
          hs_task_priority: 'MEDIUM',
          hs_timestamp: new Date().toISOString()
        },
        associations: [{
          to: { id: quoteId },
          types: [{
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 204
          }]
        }]
      })
    });

    return { success: true, message: 'Quote expiration processed' };
  } catch (error) {
    console.error('Error handling quote expiration:', error);
    return { success: false, error: error.message };
  }
}

// Main webhook handler
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-HubSpot-Signature-V2');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate HubSpot signature
    validateHubSpotSignature(req);

    const { actionType, objectId, contactId, inputFields } = req.body;

    console.log('Received webhook:', { actionType, objectId, contactId });

    let result;

    switch (actionType) {
      case 'PROCESS_SIGNED_QUOTE':
        result = await processSignedQuote(objectId, contactId);
        break;
        
      case 'HANDLE_QUOTE_EXPIRATION':
        result = await handleQuoteExpiration(objectId);
        break;
        
      default:
        return res.status(400).json({
          success: false,
          error: `Unknown action type: ${actionType}`
        });
    }

    // Return success response with results
    res.status(200).json({
      success: true,
      actionType,
      objectId,
      result,
      outputFields: {
        processing_status: result.errors.length === 0 ? 'SUCCESS' : 'PARTIAL_SUCCESS',
        errors_count: result.errors.length,
        processed_timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Webhook processing failed',
      message: error.message
    });
  }
}

// Alternative export for different serverless platforms
module.exports = handler;
