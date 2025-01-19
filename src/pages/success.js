'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

function Success() {
  const [order, setOrder] = useState(null); // `null` for uninitialized state
  const [isChecking, setIsChecking] = useState(true); // Track if it's still checking
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Retrieve orderId from URL

  useEffect(() => {
    if (!orderId) {
      console.error("Order ID is missing from the URL");
      return;
    }

    let intervalId;
    let timeoutId;

    const checkOrder = async () => {
      try {
        const ref = doc(db, `orders/${orderId}`);
        const data = await getDoc(ref);
        if (data.exists()) {
          setOrder(data.data());
          setIsChecking(false); // Stop checking when data is found
          clearInterval(intervalId); // Clear interval if order is found
        } else {
          console.log("Order not found yet, checking again...");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    // Check immediately, then set an interval
    checkOrder();
    intervalId = setInterval(checkOrder, 3000); // Check every 3 seconds

    // Stop checking after a certain timeout (e.g., 30 seconds)
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setIsChecking(false);
      console.error("Order not found within timeout");
    }, 40000); // 30-second timeout

    // Cleanup on unmount or when checking is complete
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [orderId]); // Depend on `orderId`

  return (
    <div>
      {isChecking ? (
        "Checking for order..."
      ) : order ? (
        order.payment?.status === 3 ? (
          "Payment was successful"
        ) : (
          "Payment was not successful!"
        )
      ) : (
        "Order not found or an error occurred"
      )}

      <div>Order ID: {orderId}</div>
    </div>
  );
}

export default Success;
