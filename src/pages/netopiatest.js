import PaymentForm from '@/components/PaymentForm';
import axios from 'axios';
import React from 'react'

function NetopiaTest() {

  
  const workplz = async () => {
    const options = {
      method: 'POST',
      url: 'https://secure.sandbox.netopia-payments.com/payment/card/start',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'hGIutoXOc4j4scsfC6AoSQBjcEcd5spJPxQRPGkiMxjvbx01gmJRLhUKpZo='
      },
      data: {
        config: {
          emailTemplate: '',
          emailSubject: '',
          notifyUrl: 'https://mabiswoodeko.vercel.app/success',
          redirectUrl: 'https://localhost:3000/netopiatest',
          language: 'ro'
        },
        payment: {
          options: {installments: 0, bonus: 0},
          instrument: {
            type: 'card',
            account: '9900009184214768',
            expMonth: 12,
            expYear: 2025,
            secretCode: '111',
            token: ''
          },
          data: {
            BROWSER_USER_AGENT: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            BROWSER_TZ: 'Europe/Bucharest',
            BROWSER_COLOR_DEPTH: '32',
            BROWSER_JAVA_ENABLED: 'true',
            BROWSER_LANGUAGE: 'en-US,en;q=0.9',
            BROWSER_TZ_OFFSET: '0',
            BROWSER_SCREEN_WIDTH: '1200',
            BROWSER_SCREEN_HEIGHT: '1400',
            BROWSER_PLUGINS: 'Chrome PDF Plugin, Chrome PDF Viewer, Native Client',
            MOBILE: 'false',
            SCREEN_POINT: 'false',
            OS: 'macOS',
            OS_VERSION: '10.15.7 (32-bit)',
            IP_ADDRESS: '127.0.0.1'
          }
        },
        order: {
          ntpID: '',
          posSignature: '2PRA-08VD-FEJZ-BQD7-RDJD',
          dateTime: '2023-08-24T14:15:22Z',
          description: 'Some order description',
          orderID: '23223',
          amount: 1,
          currency: 'RON',
          billing: {
            email: 'user@example.com',
            phone: '+407xxxxxxxx',
            firstName: 'First',
            lastName: 'Last',
            city: 'City',
            country: 642,
            countryName: 'Romania',
            state: 'State',
            postalCode: 'Zip',
            details: ''
          },
          shipping: {
            email: 'user@example.com',
            phone: '+407xxxxxxxx',
            firstName: 'First',
            lastName: 'Last',
            city: 'City',
            country: 642,
            state: 'State',
            postalCode: 'Zip',
            details: ''
          },
          products: [{name: 'string', code: 'SKU', category: 'category', price: 1, vat: 19}],
          installments: {selected: 0, available: [0]},
          data: {property1: 'string', property2: 'string'}
        }
      }
    };
    
    try {
      const { data } = await axios.request(options);
      console.log(data.customerAction.formData)

      if(data.error.code == 100) {
        verify3DSandbox(data.customerAction.formData)
      }


    } catch (error) {
      console.error(error);
    }
  
}

const verify3DSandbox = async (formData) => {

  const options = {
    method: 'POST',
    url: 'https://secure.sandbox.netopia-payments.com/sandbox/authorize',
    headers: {'Content-Type': 'application/x-www-form-urlencoded', Accept: 'text/html'},
    data: formData,
  };
  
  try {
    const { data } = await axios.request(options);
    window.location.href = data
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div>
    {/* <button onClick={workplz}>Haide</button>    */}
    <PaymentForm />
    </div>
  )
}

export default NetopiaTest
