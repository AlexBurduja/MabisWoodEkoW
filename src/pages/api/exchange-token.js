export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { accessToken } = req.body;
  
    if (!accessToken) {
      return res.status(400).json({ error: 'Access token is required' });
    }
  
    const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
  
    try {
      const response = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=375f3282b89aebc5e85cae3df69efc6f&access_token=${accessToken}`);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error.message);
      }
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error exchanging access token:', error);
      res.status(500).json({ error: 'Failed to exchange access token' });
    }
  }
  