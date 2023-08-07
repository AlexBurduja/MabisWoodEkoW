import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://roloca.coldfuse.io/judete');
    const judete = response.data;

    res.status(200).json({ judete });
  } catch (error) {
    console.error('Error fetching judete:', error);
    res.status(500).json({ error: 'An error occurred while fetching judete.' });
  }
}
