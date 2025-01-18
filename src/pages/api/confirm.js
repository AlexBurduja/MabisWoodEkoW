export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { order, payment } = req.body;

      // Check if order and payment are available in the request body
      if (!order || !payment) {
        throw new Error('Invalid request body');
      }

      // Send the response with the payment status and error code
      const status = payment.status;
      return res.status(200).json({
        errorCode: 0,
        status: status,  // Add the payment status in the response
      });

    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(400).json({ errorCode: 1 });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
