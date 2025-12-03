// Netlify function to fetch HubSpot owners
// This bypasses CORS restrictions by making the API call from the server

const HUBSPOT_API_BASE = "https://api.hubapi.com";

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error("Missing HUBSPOT_ACCESS_TOKEN environment variable");
    }

    const response = await fetch(`${HUBSPOT_API_BASE}/crm/v3/owners/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HubSpot API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        owners: data.results || [],
        count: data.results?.length || 0
      })
    };

  } catch (err) {
    console.error("Error fetching owners:", err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: err.message
      })
    };
  }
};
