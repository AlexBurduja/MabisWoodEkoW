export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { order, payment } = req.body;

      console.log(payment.status);

      // Send Netopia the required 200 response immediately
      res.status(200).json({ errorCode: 0 });

      // Perform user redirection (handled asynchronously, not for Netopia)
      if (payment.status === 3) {
        // Payment successful
        return res.redirect('/success', 200)
      } else {
        // Payment failed or canceled
        return res.redirect('/cancel', 200)
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
