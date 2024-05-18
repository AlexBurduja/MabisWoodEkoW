import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const url = req.query.url;
  const timestamp = req.query.timestamp

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Extract data using Cheerio selectors
    const metaDescription = $('meta[name="description"]').attr('content');
    const match = metaDescription.match(/(\d+) likes, (\d+) comments/);

    if (!match || match.length < 3) {
      throw new Error('Failed to extract like count and comment count');
    }

    const likeCount = parseInt(match[1], 10);
    const commentCount = parseInt(match[2], 10);

    res.status(200).json({ likeCount, commentCount, timestamp });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
