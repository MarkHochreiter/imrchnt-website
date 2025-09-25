// Serverless function to fetch products from HubSpot
// This can be deployed to Vercel, Netlify, or AWS Lambda

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

// Transform HubSpot product data to match frontend expectations
function transformProductData(hubspotProducts) {
  const transformedProducts = [];

  hubspotProducts.forEach(product => {
    const properties = product.properties;
    
    // Extract basic product info
    const baseProduct = {
      id: product.id,
      name: properties.name || 'Unnamed Product',
      description: properties.description || '',
      category: properties.hs_product_type || 'Uncategorized',
      price: parseFloat(properties.price || '0'),
      sku: properties.hs_sku || '',
      type: 'accessory' // Default type
    };

    // Handle terminals with rent/buy options
    if (properties.hs_product_type === 'Terminals' || properties.hs_product_type === 'Terminal') {
      baseProduct.type = 'terminal';
      baseProduct.rentPrice = parseFloat(properties.hs_recurring_billing_price || properties.price || '0');
      baseProduct.buyPrice = parseFloat(properties.price || '0');
      
      // Handle accessories - look for related products or custom properties
      baseProduct.accessories = [];
      
      // If accessories are stored as a JSON string in a custom property
      if (properties.accessories) {
        try {
          baseProduct.accessories = JSON.parse(properties.accessories);
        } catch (e) {
          console.warn('Failed to parse accessories for product:', product.id);
        }
      }
    }

    transformedProducts.push(baseProduct);
  });

  return transformedProducts;
}

// Main handler function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for required environment variable
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is not set');
    }

    // Fetch products from HubSpot
    const response = await hubspotRequest('/crm/v3/objects/products', {
      method: 'GET'
    });

    // Transform the data for frontend consumption
    const transformedProducts = transformProductData(response.results || []);

    // Return the products
    res.status(200).json({
      success: true,
      products: transformedProducts,
      total: transformedProducts.length
    });

  } catch (error) {
    console.error('Error fetching products from HubSpot:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      message: error.message
    });
  }
}

// Alternative export for different serverless platforms
module.exports = handler;
