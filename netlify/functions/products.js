// Enhanced Netlify function to fetch products with images from HubSpot

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
  console.log('Transforming product data with images...');
  
  return hubspotProducts.map(product => {
    const props = product.properties || {};
    
    // Get the SKU
    const sku = props.hs_sku || '';
    
    // Get product image - HubSpot stores images in different possible fields
    let imageUrl = '';
    if (props.hs_product_image) {
      imageUrl = props.hs_product_image;
    } else if (props.product_image) {
      imageUrl = props.product_image;
    } else if (props.image_url) {
      imageUrl = props.image_url;
    } else if (props.hs_featured_image) {
      imageUrl = props.hs_featured_image;
    } else if (props.hs_image_url) {
      imageUrl = props.hs_image_url;
    }
    
    // Log each product for debugging
    console.log(`Processing product: ${props.name || 'Unnamed'} (SKU: ${sku || 'No SKU'}) (Image: ${imageUrl ? 'Yes' : 'No'})`);
    
    // Determine if this is a terminal or accessory based on SKU
    const skuParts = sku.toUpperCase().split('-');
    const isTerminal = skuParts.length >= 2 && skuParts[1] === 'T';
    const isRental = skuParts.length >= 3 && skuParts[2] === 'R';
    
    // Get prices - try multiple property names
    const price = parseFloat(props.price || props.hs_price || '0');
    const rentPrice = parseFloat(props.hs_recurring_billing_price || props.rental_price || '0');
    const buyPrice = parseFloat(props.purchase_price || props.price || props.hs_price || '0');
    
    // Generate fallback image based on product type and family
    let fallbackImage = '';
    if (sku.includes('AMS1')) {
      fallbackImage = isTerminal ? '/images/ams1-terminal.jpg' : '/images/ams1-accessory.jpg';
    } else if (sku.includes('SFO1')) {
      fallbackImage = isTerminal ? '/images/sfo1-terminal.jpg' : '/images/sfo1-accessory.jpg';
    } else if (sku.includes('S1F2')) {
      fallbackImage = isTerminal ? '/images/s1f2-terminal.jpg' : '/images/s1f2-accessory.jpg';
    } else {
      fallbackImage = '/images/default-product.jpg';
    }
    
    const transformedProduct = {
      id: product.id,
      name: props.name || 'Unnamed Product',
      description: props.description || props.hs_description || '',
      category: props.hs_product_type || 'Hardware',
      price: price,
      rentPrice: isRental ? price : rentPrice,
      buyPrice: isRental ? 0 : (buyPrice || price),
      sku: sku,
      type: isTerminal ? 'terminal' : 'accessory',
      
      // Image properties
      imageUrl: imageUrl || fallbackImage,
      hasImage: !!imageUrl,
      fallbackImage: fallbackImage,
      
      // Additional properties
      productType: props.hs_product_type || '',
      recurringBillingPrice: rentPrice,
      createDate: props.createdate || '',
      lastModified: props.hs_lastmodifieddate || ''
    };
    
    console.log(`Transformed product with image:`, {
      name: transformedProduct.name,
      sku: transformedProduct.sku,
      imageUrl: transformedProduct.imageUrl,
      hasImage: transformedProduct.hasImage
    });
    
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
    console.log('Starting product fetch from HubSpot with images...');
    
    // Check environment variables
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is not set');
    }
    
    console.log('Environment variables OK, making API request...');

    // Fetch products with image properties included
    const queryParams = new URLSearchParams({
      properties: [
        'name',
        'description', 
        'hs_description',
        'price',
        'hs_price',
        'hs_sku',
        'hs_product_type',
        'hs_recurring_billing_price',
        'purchase_price',
        'rental_price',
        'createdate',
        'hs_lastmodifieddate',
        // Image properties - try multiple possible field names
        'hs_product_image',
        'product_image',
        'image_url',
        'hs_featured_image',
        'hs_image_url',
        'featured_image'
      ].join(','),
      limit: '100'
    });

    const response = await hubspotRequest(`/crm/v3/objects/products?${queryParams}`, {
      method: 'GET'
    });

    console.log('Raw HubSpot response (first product):', JSON.stringify(response.results?.[0], null, 2));

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
          message: 'No products found in HubSpot response'
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
          message: 'No products found in HubSpot catalog'
        })
      };
    }

    // Transform the products
    const transformedProducts = transformProductData(response.results);
    
    console.log(`Successfully transformed ${transformedProducts.length} products`);

    // Log image statistics
    const withImages = transformedProducts.filter(p => p.hasImage).length;
    const withoutImages = transformedProducts.length - withImages;
    console.log(`Image stats: ${withImages} with images, ${withoutImages} using fallbacks`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        products: transformedProducts,
        total: transformedProducts.length,
        message: `Successfully fetched ${transformedProducts.length} products`,
        imageStats: {
          withImages: withImages,
          withoutImages: withoutImages,
          totalProducts: transformedProducts.length
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
          hasToken: !!process.env.HUBSPOT_ACCESS_TOKEN
        }
      })
    };
  }
};
