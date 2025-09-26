// Fixed Netlify function to properly fetch SKUs from HubSpot

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

async function hubspotRequest(endpoint, options = {}) {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is not set');
  }

  const url = `${HUBSPOT_API_BASE}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  console.log(`Making HubSpot API request to: ${url}`);

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`HubSpot API error: ${response.status} - ${errorText}`);
    throw new Error(`HubSpot API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log(`HubSpot API response: ${data.results?.length || 0} products found`);
  
  return data;
}

function transformProductData(hubspotProducts) {
  console.log('Transforming product data...');
  
  return hubspotProducts.map(product => {
    const props = product.properties || {};
    
    // Get the SKU - this is the key fix!
    const sku = props.hs_sku || '';
    
    // Log each product for debugging
    console.log(`Processing product: ${props.name || 'Unnamed'} (SKU: ${sku || 'No SKU'})`);
    
    // Determine if this is a terminal or accessory based on SKU
    const skuParts = sku.toUpperCase().split('-');
    const isTerminal = skuParts.length >= 2 && skuParts[1] === 'T';
    const isRental = skuParts.length >= 3 && skuParts[2] === 'R';
    
    // Get prices - try multiple property names
    const price = parseFloat(props.price || props.hs_price || '0');
    const rentPrice = parseFloat(props.hs_recurring_billing_price || props.rental_price || '0');
    const buyPrice = parseFloat(props.purchase_price || props.price || props.hs_price || '0');
    
    const transformedProduct = {
      id: product.id,
      name: props.name || 'Unnamed Product',
      description: props.description || props.hs_description || '',
      category: props.hs_product_type || 'Hardware',
      price: price,
      rentPrice: isRental ? price : rentPrice,
      buyPrice: isRental ? 0 : (buyPrice || price),
      sku: sku, // This should now have the actual SKU!
      type: isTerminal ? 'terminal' : 'accessory',
      
      // Additional properties that might be useful
      productType: props.hs_product_type || '',
      recurringBillingPrice: rentPrice,
      createDate: props.createdate || '',
      lastModified: props.hs_lastmodifieddate || ''
    };
    
    console.log(`Transformed product:`, transformedProduct);
    return transformedProduct;
  });
}

exports.handler = async function(event, context) {
  // CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Method not allowed',
        allowedMethods: ['GET']
      })
    };
  }

  try {
    console.log('Starting product fetch from HubSpot...');
    
    // Check environment variables
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is not set');
    }
    
    console.log('Environment variables OK, making API request...');

    // FIXED: Properly format the query parameters in the URL
    const queryParams = new URLSearchParams({
      properties: [
        'name',
        'description', 
        'hs_description',
        'price',
        'hs_price',
        'hs_sku',  // This is the key property we need!
        'hs_product_type',
        'hs_recurring_billing_price',
        'purchase_price',
        'rental_price',
        'createdate',
        'hs_lastmodifieddate'
      ].join(','),
      limit: '100'
    });

    // FIXED: Append query parameters to the URL correctly
    const response = await hubspotRequest(`/crm/v3/objects/products?${queryParams}`, {
      method: 'GET'
    });

    console.log('Raw HubSpot response:', JSON.stringify(response, null, 2));

    // Check if we got results
    if (!response.results) {
      console.warn('No results array in HubSpot response');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          products: [],
          total: 0,
          message: 'No products found in HubSpot response',
          debug: {
            responseKeys: Object.keys(response),
            hasResults: !!response.results
          }
        })
      };
    }

    if (response.results.length === 0) {
      console.warn('HubSpot returned empty results array');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          products: [],
          total: 0,
          message: 'No products found in HubSpot catalog',
          debug: {
            resultsLength: response.results.length,
            totalResults: response.total || 0
          }
        })
      };
    }

    // Transform the products
    const transformedProducts = transformProductData(response.results);
    
    console.log(`Successfully transformed ${transformedProducts.length} products`);

    // Log a sample of SKUs to verify they're coming through
    const skuSample = transformedProducts.slice(0, 3).map(p => ({ name: p.name, sku: p.sku }));
    console.log('Sample SKUs:', skuSample);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        products: transformedProducts,
        total: transformedProducts.length,
        message: `Successfully fetched ${transformedProducts.length} products`,
        debug: {
          originalCount: response.results.length,
          transformedCount: transformedProducts.length,
          hubspotTotal: response.total || 0,
          sampleSKUs: skuSample
        }
      })
    };

  } catch (error) {
    console.error('Error in products function:', error);
    console.error('Error stack:', error.stack);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch products from HubSpot',
        message: error.message,
        debug: {
          errorType: error.constructor.name,
          timestamp: new Date().toISOString(),
          hasToken: !!process.env.HUBSPOT_ACCESS_TOKEN,
          tokenPrefix: process.env.HUBSPOT_ACCESS_TOKEN ? process.env.HUBSPOT_ACCESS_TOKEN.substring(0, 10) + '...' : 'Not set'
        }
      })
    };
  }
};
