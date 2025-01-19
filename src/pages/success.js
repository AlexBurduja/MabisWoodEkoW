import { doc, getDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';

function Success() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Retrieve orderId from URL
  const [order, setOrder] = useState(null); // State to hold order data
  const [isChecking, setIsChecking] = useState(true); // State to track if checking is in progress

  useEffect(() => {
    if (!orderId) {
      console.error("Order ID is missing from the URL");
      return;
    }

    // Function to check the order's payment status
    const checkOrder = async () => {
      try {
        const ref = doc(db, `orders/${orderId}`);
        const data = await getDoc(ref);
        if (data.exists()) {
          const orderData = data.data();
          setOrder(orderData);
        } else {
          console.log("Order not found yet, checking again...");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    // Start periodic checking
    const intervalId = setInterval(() => {
      checkOrder();
    }, 1000); // Check every 3 seconds

    // Stop checking after 30 seconds to prevent infinite loop
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setIsChecking(false);
      console.error("Order not found within timeout");
    }, 1000); // 30 seconds timeout

    // Initial check
    checkOrder();

    // Cleanup the interval and timeout on component unmount
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [orderId]); // Depend on `orderId`

  return (
    <div>
      <h1>Success Page</h1>
      {isChecking ? (
        <p>Checking your payment...</p> // Display message while checking
      ) : order ? (
        order.payment?.message && order.payment?.amount ? (
          <div>
            <p>Payment Message: {order.payment.message}</p>
            <p>Amount: {order.payment.amount}</p>
          </div>
        ) : (
          <p>Payment information not available yet. Please try again.</p>
        )
      ) : (
        <p>Order not found or payment failed.</p>
      )}
    </div>
  );
}

export default Success;
