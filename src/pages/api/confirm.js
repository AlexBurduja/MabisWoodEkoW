import { confirmOrder } from "@/components/reusableComponents/ConfirmOrder";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { order, payment } = req.body; // Netopia sends this data

      console.log('Order ID:', order);
      console.log('Payment Status:', payment);

      await confirmOrder({ order, payment })

      return res.status(200).json({ errorCode: 0 });
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
