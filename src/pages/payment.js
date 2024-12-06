import React from 'react'

export default function Payment() {
    const handlePayment = async () => {
        const response = await fetch('/api/netopiapayment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: '12345',
          }),
        });
      
        const data = await response.json();
        console.log('Encrypted Payment Data:', data);
      };      

    return (
    <button onClick={handlePayment}>
        doamne ajuta!!!!
    </button>
  )
}
