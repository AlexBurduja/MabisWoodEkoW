export default function handler(req, res) {
  if (req.method === 'POST') {
      console.log('IPN Received:', req.body);

      res.status(200).json({ errorCode: 0 });
  } else {
      res.status(405).json({ error: 'Method not allowed' });
  }
}
