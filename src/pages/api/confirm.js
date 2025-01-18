export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { order, payment } = req.body;

      // Check if order and payment are available in the request body
      if (!order || !payment) {
        throw new Error('Invalid request body');
      }

      // Generate the redirect URL with status
      const status = payment.status;
      const returnUrl = `/payment-status?orderId=${order.orderID}&status=${status}`;

      // Respond with the required 200 status code for Netopia
      res.status(200).json({ errorCode: 0 });

      // Optionally, you could log the payment result or handle other processes here

      // Redirect to the frontend return URL
      return res.redirect(returnUrl);

    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(400).json({ errorCode: 1 });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
