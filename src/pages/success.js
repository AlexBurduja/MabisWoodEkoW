import { doc, getDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import axios from 'axios';

function Success() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Retrieve orderId from URL
  const [order, setOrder] = useState(null); // State to hold order data
  const [isChecking, setIsChecking] = useState(true); // State to track if checking is in progress

  // Function to check the order's payment status
  const checkOrder = async () => {
    try {
      const ref = doc(db, `orders/${orderId}`);
      const data = await getDoc(ref);
      if (data.exists()) {
        const orderData = data.data();
        setOrder(orderData);
        return true; // Indicate that the order was found
      } else {
        console.log("Order not found yet, checking again...");
        return false; // Order not found
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      return false; // Handle errors gracefully
    }
  };

  // Function to handle invoice success
  const successInvoiceFunction = async () => {
    if (!order) {
      console.log("Order data is not ready for invoice generation.");
      return;
    }

    try {
      console.log(order);
      const response = await axios.post('/api/invoice/invoice', {
        order: order,
      });
      console.log(response.data);
    } catch (e) {
      console.error("Error sending invoice:", e);
    }
  };

  useEffect(() => {
    if (!orderId) {
      console.error("Order ID is missing from the URL");
      return;
    }

    let intervalId;
    let timeoutId;

    const startChecking = async () => {
      let found = false;

      intervalId = setInterval(async () => {
        if (!found) {
          found = await checkOrder(); // Check the order
          if (found) {
            clearInterval(intervalId); // Stop the interval if order is found
            setIsChecking(false); // Update checking status
            console.log("Order found, stopping periodic checks.");
          }
        }
      }, 3000); // Check every 3 seconds

      timeoutId = setTimeout(() => {
        if (!found) {
          clearInterval(intervalId); // Stop periodic checks after timeout
          setIsChecking(false); // Update checking status
          console.error("Order not found within timeout");
        }
      }, 30000); // 30 seconds timeout
    };

    startChecking(); // Start the checking process

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [orderId]); // Depend only on `orderId`

  useEffect(() => {
    if (order) {
      successInvoiceFunction(); // Trigger invoice function when the order is found
    }
  }, [order]); // Depend on `order`

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
