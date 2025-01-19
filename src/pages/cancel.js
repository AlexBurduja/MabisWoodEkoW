import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FcCancel } from 'react-icons/fc';
import { db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

function CancelPage() {
  const [order, setOrder] = useState(null); // State for storing order details
  const [isChecking, setIsChecking] = useState(true); // State for tracking the loading state
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Get orderId from URL

  useEffect(() => {
    if (!orderId) {
      console.error("Order ID is missing from the URL");
      return;
    }

    // Function to check the order's details
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

    // Start periodic checking every 3 seconds
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

    // Cleanup interval and timeout on component unmount
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [orderId]); // Depend on `orderId`

  return (
    <div className="cancelFlex">
      <div className="cancelBackground">
        <div className="cancelIcon">
          <FcCancel className="cancelIcon__icon" />
        </div>

        <div className="cancelTitle">
          <h1>Failed / Canceled</h1>
        </div>

        <div className="cancelButtonsAndText">
          <div>
            <p>Payment failed/canceled.</p>
            {isChecking ? (
              <p>Checking your payment...</p> // Show message while checking
            ) : order ? (
              order.payment?.message ? (
                <p>{order.payment.message}</p> // Show payment message if available
              ) : (
                <p>No payment message available</p>
              )
            ) : (
              <p>Order not found or payment information not available</p>
            )}
            <p>What do you wish to do next?</p>
          </div>

          <div className="cancelButtonsAndText__buttons">
            <Link href="/cart">To Cart!</Link>
            <Link href="/">To Home!</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelPage;
