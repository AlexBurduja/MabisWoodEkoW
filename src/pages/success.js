import React, { useEffect, useState } from 'react';

function Success() {
  const [status, setStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Fetch the data from the backend (confirm.js)
        const response = await fetch('/api/confirm', {
          method: 'POST',  // or GET, depending on your setup
          headers: {
            'Content-Type': 'application/json',
          },
          // No need to pass anything in the body as the backend handles it
        });

        const result = await response.json();

        if (response.ok && result.errorCode === 0) {
          // On success, display order and payment status
          setOrderDetails({
            order: result.order,
            payment: result.payment,
          });
          setStatus('Payment Successful');
        } else {
          setStatus('Payment Failed');
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setStatus('Error processing payment');
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div>
      {status ? (
        <h2>{status}</h2>
      ) : (
        <h2>Processing payment...</h2>
      )}
      {orderDetails && (
        <div>
          <p>Order ID: {orderDetails.order_id}</p>
          <p>Payment Status: {orderDetails.payment_status}</p>
        </div>
      )}
    </div>
  );
}

export default Success;
