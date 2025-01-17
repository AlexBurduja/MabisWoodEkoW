import { Netopia } from 'netopia-card';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const netopia = new Netopia({
      apiKey: process.env.NETOPIA_API_KEY,
      sandbox: true, // Set to false for production
      apiBaseUrl: process.env.API_BASE_URL,
      notifyUrl: process.env.NETOPIA_CONFIRM_URL,
      posSignature: process.env.NETOPIA_SIGNATURE,
      language: 'EN',
    });

    const { invoiceData, browserInfo } = req.body;
    const ids = crypto.randomUUID();

    const paymentRequest = {
      config: {
        cancelUrl: 'https://mabiswoodeko.vercel.app/cancel',
        language: "RO"
      },
      order: {
        posSignature: process.env.NETOPIA_SIGNATURE,
        dateTime: new Date().toISOString(),
        description: `Comanda ${ids}`,
        orderID: ids,
        amount: invoiceData.amount,
        currency: 'RON',
        billing: {
          email: invoiceData.email,
          phone: '+407xxxxxxxx',
          firstName: invoiceData.firstName,
          lastName: invoiceData.lastName,
          city: invoiceData.city,
          country: 642,
          countryName: 'Romania',
          state: invoiceData.state,
          postalCode: invoiceData.postalCode,
          details: '',
        },
      },
      payment: {
        options: {
          installments: 0,
          bonus: 0,
        },
        instrument: {
          type: 'card',
        },
        data: {
          customKey: 'customValue', // Optional custom attributes
        },
      },
    };

    try {
      netopia.setOrderData(paymentRequest.order);
      netopia.setProductsData([
        {
          name: 'Product Name',
          code: '001',
          category: 'Category',
          price: invoiceData.amount,
          vat: 0,
        },
      ]);
      netopia.setBrowserData(browserInfo, req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress);

      const paymentResponse = await netopia.startPayment(paymentRequest);
      console.log('payreq:', paymentRequest)
      console.log(paymentResponse)

      res.status(200).json({
        paymentURL: paymentResponse.payment.paymentURL,
      });
    } catch (error) {
      console.error('Payment Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
