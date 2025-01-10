'use strict';

const rc4 = require('./encrypt.js'); 
const fs = require('fs');
const dotenv = require("dotenv");
dotenv.config();

const privateKeyPath = process.env.PRIVATE_KEY_PATH;  
const publicKeyPath = process.env.PUBLIC_KEY_PATH;    


const privateKey = fs.readFileSync(privateKeyPath).toString();
const publicKey = fs.readFileSync(publicKeyPath).toString();

const xml2js = require('xml2js');
var builder = new xml2js.Builder({
  cdata: true
});

const getPayment = (orderId, amount, currency) => {
  let date = new Date();

  const data = {
    order: {
      $: {
        id: orderId,
        timestamp: date.getTime(),
        type: 'card'
      },
      signature: '2PRA-08VD-FEJZ-BQD7-RDJD',  
      url: {
        return: 'https://mabiswoodeko.vercel.app/cancel',  
        confirm: 'https://mabiswoodeko.vercel.app/success' 
      },
      invoice: {
        $: {
          currency: currency,
          amount: amount,
        },
        details: 'test plata',
        contact_info: {
          billing: {
            $: {
              type: 'person'
            },
            first_name: 'Test',
            last_name: 'Test',
            address: 'strada',
            email: 'test@mobilpay.ro',
            mobile_phone: 'mobilePhone'
          },
          shipping: {
            $: {
              type: 'person'
            },
            first_name: 'Test',
            last_name: 'Test',
            address: 'strada',
            email: 'test@mobilpay.ro',
            mobile_phone: 'mobilePhone'
          }
        }
      },
      ipn_cipher: 'aes-256-cbc',
    }
  };

  return { data, algorithm: 'aes-256-cbc' };
}


function getRequest(orderId) {
    const result = getPayment(orderId, 1, 'RON'); 
    let xml = builder.buildObject(result.data);
    console.log('Generated XML:', xml); 
  
    return rc4.encrypt(publicKey, xml, result.algorithm);
  }

module.exports = {
  getRequest: getRequest,
};
