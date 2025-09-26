// Fetches products from HUBSPOT into Website HardwareRequestModal

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

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

function transformProductData(hubspotProducts) {
  return hubspotProducts.map(product => ({
    id: product.id,
    name: product.properties.name || 'Unnamed Product',
    description: product.properties.description || '',
    category: product.properties.hs_product_type || 'Uncategorized',
    price: parseFloat(product.properties.price || '0'),
    sku: product.properties.hs_sku || '',
    type: product.properties.hs_product_type === 'Terminal' ? 'terminal' : 'accessory'
  }));
}

exports.handler = async function(event, context) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error("HUBSPOT_ACCESS_TOKEN not set");
    }

    const response = await hubspotRequest("/crm/v3/objects/products", {
      method: "GET"
    });

    const transformedProducts = transformProductData(response.results || []);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        products: transformedProducts,
        total: transformedProducts.length
      })
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Failed to fetch products",
        message: error.message
      })
    };
  }
};
