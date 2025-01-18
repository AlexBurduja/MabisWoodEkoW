export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log("IPN RECEIVED:", req.body)
      // if (payment.status === 3) {
      //   // Payment successful
      //   return res.redirect(`/success?orderId=${order.orderID}`);
      // } else {
      //   // Payment failed or canceled
      //   return res.redirect(`/cancel?orderId=${order.orderID}`);
      // }
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
