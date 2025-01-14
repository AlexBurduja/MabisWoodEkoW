export default function handler(req, res) {
    if (req.method === 'POST') {
        const { invoiceData, browserInfo } = req.body;

        // Extract the IP address
        const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Log the data
        console.log('Invoice Data:', invoiceData);
        console.log('Browser Info:', browserInfo);
        console.log('User IP:', userIP);

        // Simulate returning a payment URL
        const paymentURL = 'https://example-payment-gateway.com/checkout';

        res.status(200).json({ userIP, invoiceData, browserInfo });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
