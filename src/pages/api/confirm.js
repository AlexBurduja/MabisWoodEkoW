export default function handler(req, res) {
    if (req.method === 'POST') {
      // Handle IPN data from Netopia
      console.log('IPN Received:', req.body);
      res.status(200).send('OK');
    } else {
      res.status(405).send('Method not allowed');
    }
  }
  