import axios from 'axios';

export default async function handler(req, res) {
  const { auto } = req.query;

  if (!auto) {
    return res.status(400).json({ error: 'Missing "auto" parameter.' });
  }

  try {
    const response = await axios.get(`https://roloca.coldfuse.io/orase/${encodeURIComponent(auto)}`);
    const orase = response.data;

    res.status(200).json({ orase });
  } catch (error) {
    console.error('Error fetching orase:', error);
    res.status(500).json({ error: 'An error occurred while fetching orase.' });
  }
}
