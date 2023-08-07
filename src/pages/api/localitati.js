import axios from 'axios';

export default async function handler(req, res) {
  const { judet } = req.query;

  if (!judet) {
    return res.status(400).json({ error: 'Missing "judet" parameter.' });
  }

  try {
    const response = await axios.get(`https://api.apis.ro/api/localitati?judet=${encodeURIComponent(judet)}`);
    const localitati = response.data;

    res.status(200).json({ localitati });
  } catch (error) {
    console.error('Error fetching localitati:', error);
    res.status(500).json({ error: 'An error occurred while fetching localitati.' });
  }
}
