import React from 'react'

function Paymentpls() {
    const paymentPlss = async () => {
        const url = 'https://secure.sandbox.netopia-payments.com/payment/card/start';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: '123'
          },
          body: {
            "config": {
              "emailTemplate": "",
              "emailSubject": "",
              "notifyUrl": "https://www.my.domain/my_notify_url",
              "redirectUrl": "https://www.my.domain/my_redirect_url",
              "language": "ro"
            },
            "payment": {
              "options": {
                "installments": 0,
                "bonus": 0
              },
              "instrument": {
                "type": "card",
                "account": "9900009184214768",
                "expMonth": 12,
                "expYear": 2022,
                "secretCode": "111",
                "token": ""
              },
              "data": {
                "BROWSER_USER_AGENT": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
                "BROWSER_TZ": "Europe/Bucharest",
                "BROWSER_COLOR_DEPTH": "32",
                "BROWSER_JAVA_ENABLED": "true",
                "BROWSER_LANGUAGE": "en-US,en;q=0.9",
                "BROWSER_TZ_OFFSET": "0",
                "BROWSER_SCREEN_WIDTH": "1200",
                "BROWSER_SCREEN_HEIGHT": "1400",
                "BROWSER_PLUGINS": "Chrome PDF Plugin, Chrome PDF Viewer, Native Client",
                "MOBILE": "false",
                "SCREEN_POINT": "false",
                "OS": "macOS",
                "OS_VERSION": "10.15.7 (32-bit)",
                "IP_ADDRESS": "127.0.0.1"
              }
            },
            "order": {
              "ntpID": "",
              "posSignature": "XXXX-XXXX-XXXX-XXXX-XXXX",
              "dateTime": "2023-08-24T14:15:22Z",
              "description": "Some order description",
              "orderID": "Merchant order Id",
              "amount": 1,
              "currency": "RON",
              "billing": {
                "email": "user@example.com",
                "phone": "+407xxxxxxxx",
                "firstName": "First",
                "lastName": "Last",
                "city": "City",
                "country": 642,
                "countryName": "Romania",
                "state": "State",
                "postalCode": "Zip",
                "details": ""
              },
              "shipping": {
                "email": "user@example.com",
                "phone": "+407xxxxxxxx",
                "firstName": "First",
                "lastName": "Last",
                "city": "City",
                "country": 642,
                "state": "State",
                "postalCode": "Zip",
                "details": ""
              },
              "products": [
                {
                  "name": "string",
                  "code": "SKU",
                  "category": "category",
                  "price": 1,
                  "vat": 19
                }
              ],
              "installments": {
                "selected": 0,
                "available": [
                  0
                ]
              },
              "data": {
                "property1": "string",
                "property2": "string"
              }
            }
          }
        };
  
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }

    return (
    <div>
      <button onClick={paymentPlss}>Button</button>
    </div>
  )
}

export default Paymentpls
