'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

function Success() {
  const [order, setOrder] = useState(null); // Use `null` as the initial state for better clarity
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Retrieve orderId from URL

  useEffect(() => {
    if (!orderId) {
      console.error("Order ID is missing from the URL");
      return;
    }

    const getOrder = async () => {
      try {
        const ref = doc(db, `orders/${orderId}`);
        const data = await getDoc(ref);
        if (data.exists()) {
          setOrder(data.data());
        } else {
          console.error("No order found with the given ID");
          setOrder(null); // Explicitly set order to null if not found
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    getOrder();
  }, [orderId]); // Depend on `orderId`

  return (
    <div>
      {/* Conditional rendering for different states */}
      {order ? (
        order.payment?.status === 3 ? (
          "Payment was successful"
        ) : (
          "Payment was not successful!"
        )
      ) : order === null ? (
        "Loading..."
      ) : (
        "Order not found or error occurred"
      )}

      {/* Display the orderId for debugging */}
      <div>Order ID: {orderId}</div>
    </div>
  );
}

export default Success;