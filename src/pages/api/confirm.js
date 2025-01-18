export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { order, payment } = req.body; // Netopia sends this data

      console.log('Order ID:', order);
      console.log('Payment Status:', payment);

      // Send a response to the frontend with the order and payment status
      return res.status(200).json({
        errorCode: 0,           // Success code
        order,               // Send order ID from Netopia
        payment,         // Send payment status from Netopia
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
