import axios from 'axios';

function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://roloca.coldfuse.io/judete');
    const judete = response.data.map(county => ({
      ...county,
      nume: removeDiacritics(county.nume)
    }));

    res.status(200).json({ judete });
  } catch (error) {
    console.error('Error fetching judete:', error);
    res.status(500).json({ error: 'An error occurred while fetching judete.' });
  }
}
