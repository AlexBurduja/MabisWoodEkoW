import { Netopia } from 'netopia-card';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const netopia = new Netopia({
      apiKey: process.env.NETOPIA_API_KEY,
      sandbox: true, // Set to false for production
    });

    const { invoiceData, browserInfo } = req.body;
    const date = new Date();

    // Create the paymentData object dynamically based on invoiceData
    const paymentData = {
        order: {
          ntpID: '',
          dateTime: new Date().toISOString(),
          description: `Comanda ${crypto.randomUUID()}`,
          orderID: crypto.randomUUID(),
          amount: invoiceData.amount,
          currency: 'RON',
          billing: {
            email: invoiceData.email,
            phone: '+407xxxxxxxx',
            firstName: invoiceData.firstName,
            lastName: invoiceData.lastName,
            city: invoiceData.city,
            country: 642,
            countryName: 'Country',
            state: invoiceData.state,
            postalCode: invoiceData.postalCode,
            details: '',
          },
        //   shipping: {
        //     email: 'user@example.com',
        //     phone: '+407xxxxxxxx',
        //     firstName: 'First',
        //     lastName: 'Last',
        //     city: 'City',
        //     country: 642,
        //     state: 'State',
        //     postalCode: 'Zip',
        //     details: '',
        //   },
          products: [
            {
              name: 'Peleti50kg',
              code: '001',
              category: 'Lemn',
              price: 6969,
              vat: 19,
            },
          ],
          installments: {
            selected: 0,
            available: [0],
          },
          data: {
            property1: 'string',
            property2: 'string',
          },
        },
      };



    try {
      netopia.setOrderData(paymentData.order);
      netopia.setProductsData(paymentData.order.products)

      const payment = await netopia.startPayment();
      console.log("Payment:",payment)
      res.status(200).json({
        paymentURL: payment.payment.paymentURL
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
