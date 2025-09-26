// workflow-webhook.js — Netlify Serverless Function

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { workflowId, contactId } = req.body;

    if (!workflowId || !contactId) {
      return res.status(400).json({ success: false, error: "Missing workflowId or contactId" });
    }

    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      throw new Error("Missing HUBSPOT_ACCESS_TOKEN environment variable");
    }

    const url = `https://api.hubapi.com/automation/v3/workflows/${workflowId}/enrollments/contacts/${contactId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HubSpot API error: ${response.status} - ${errorText}`);
    }

    return res.status(200).json({ success: true, message: "Workflow triggered successfully" });
  } catch (err) {
    console.error("Error in workflow-webhook:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
