export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { order, payment } = req.body;

      console.log(payment.status);

      // Redirect logic (handled via headers for the user)
      if (payment.status === 3) {
        // Payment successful
        res.writeHead(302, { Location: `/success?orderId=${order.orderID}` });
      } else {
        // Payment failed or canceled
        res.writeHead(302, { Location: `/cancel?orderId=${order.orderID}` });
      }

      // Finalize response with a 200 status for Netopia
      res.status(200).json({ errorCode: 0 });
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
