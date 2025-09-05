export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Array of popular anime queries for random selection
    const popularAnime = [
      'naruto', 'one piece', 'attack on titan', 'demon slayer',
      'my hero academia', 'dragon ball', 'death note', 'fullmetal alchemist',
      'one punch man', 'tokyo ghoul', 'jujutsu kaisen', 'chainsaw man'
    ];

    const randomQuery = popularAnime[Math.floor(Math.random() * popularAnime.length)];
    const apiUrl = `https://animeapi.skin/search?q=${encodeURIComponent(randomQuery)}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return random anime from the results
    const randomAnime = data[Math.floor(Math.random() * data.length)];

    res.status(200).json({
      success: true,
      query: randomQuery,
      result: randomAnime,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Random API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch random anime',
      message: error.message
    });
  }
}
