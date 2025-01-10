import { getRequest } from '../../utils/order';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { orderId } = req.body; 

      
      const paymentRequest = getRequest(orderId);  
      console.log('Payment Request:', paymentRequest);  


      const response = await axios.post('https://sandboxsecure.mobilpay.ro', paymentRequest);
      console.log('Netopia Response:', response.data);  

      if (response.data && response.data.url) {
        res.status(200).json({ redirectUrl: response.data.url }); 
      } else {
        console.error('No redirect URL or error:', response.data);
        res.status(500).json({ error: 'No redirect URL or an error occurred' });
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      res.status(500).json({ error: 'Failed to initiate payment' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
