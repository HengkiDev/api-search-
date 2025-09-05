export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    message: 'Anime API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      search: '/api/search?q={query}',
      random: '/api/random',
      health: '/api/health'
    }
  });
}
