import { rawTextBodyParser, Netopia } from 'netopia-card';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await rawTextBodyParser(req, res);

  const netopia = new Netopia({
    apiKey: process.env.NETOPIA_API_KEY,
    sandbox: true,
  });

  try {
    const { order, payment } = await netopia.handlePaymentNotification(req.body);
    console.log("Payment:", payment, "Order:", order)
    res.status(200).json({ errorCode: 0 });
  } catch (error) {
    res.status(400).json({ errorCode: 1, message: error.message });
  }
}
