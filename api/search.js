// File: api/search.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { q } = req.query;

    // Validate query parameter
    if (!q) {
      return res.status(400).json({ 
        error: 'Query parameter "q" is required',
        example: '/api/search?q=naruto'
      });
    }

    // Fetch from original API
    const apiUrl = `https://animeapi.skin/search?q=${encodeURIComponent(q)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Add metadata to response
    const result = {
      success: true,
      query: q,
      results: data,
      total: data.length,
      timestamp: new Date().toISOString()
    };

    res.status(200).json(result);

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch anime data',
      message: error.message
    });
  }
}
