import fs from 'fs';
import { encrypt } from '../../components/encrypt'; // Adjust path as needed
import xml2js from 'xml2js';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const privateKeyPath = process.env.PRIVATE_KEY_PATH;
const publicKeyPath = process.env.PUBLIC_KEY_PATH;

const privateKey = fs.readFileSync(privateKeyPath).toString();
const publicKey = fs.readFileSync(publicKeyPath).toString();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId } = req.body;

    // Build the XML request data
    
const data = {
    order: {
      $: {
        id: orderId,
        timestamp: Date.now(),
        type: "card",
      },
      signature: "2PRA-08VD-FEJZ-BQD7-RDJD",
      url: {
        return: "https://mabiswoodeko.vercel.app/servicii",
        confirm: "https://mabiswoodeko.vercel.app/success",
      },
      invoice: {
        $: {
          currency: "RON",
          amount: 150,
        },
        details: "test plata",
        contact_info: {
          billing: {
            $: {
              type: "person",
            },
            first_name: "Test",
            last_name: "Test",
            address: "strada",
            email: "test@mobilpay.ro",
            mobile_phone: "mobilePhone",
          },
          shipping: {
            $: {
              type: "person",
            },
            first_name: "Test",
            last_name: "Test",
            address: "strada",
            email: "test@mobilpay.ro",
            mobile_phone: "mobilePhone",
          },
        },
      },
      ipn_cipher: "aes-256-cbc",
    },
  };

    const builder = new xml2js.Builder({ cdata: true });
    const xml = builder.buildObject(data);

    // Encrypt the XML data
    try {
      const encryptedData = encrypt(publicKey, xml, 'aes-256-cbc');
      res.status(200).json(encryptedData);
    } catch (error) {
      res.status(500).json({ error: 'Encryption failed', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
