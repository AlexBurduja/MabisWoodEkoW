export default function handler(req, res) {
    if (req.method === 'POST') {
      console.log('IPN Received:', req.body);
      res.status(200).send('SUCCESS');
    } else {
      res.status(405).send('Method not allowed');
    }
  }
  