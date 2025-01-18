import { NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { order, payment } = req.body;

      console.log('Payment Status:', payment.status);

      // Generate a return URL with the payment status as a query parameter
      const returnUrl = `/payment-status?orderId=${order.orderID}&status=${payment.status}`;

      // Send a 200 response to Netopia (required by their API)
      res.status(200).json({ errorCode: 0 });

      // Now, redirect the user to the return URL (you can add additional parameters here)
      return NextResponse.redirect('https://mabiswoodeko.vercel.app/cancel')

    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
