'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

function LoadingOrder() {
  const [order, setOrder] = useState(null); // State for the order data
  const [isChecking, setIsChecking] = useState(true); // Track loading state
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Retrieve orderId from URL
  const router = useRouter(); // Router for redirection

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
          const orderData = data.data();
          setOrder(orderData);

          // Redirect based on the payment status
          if (orderData.payment?.status === 3) {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            router.push(`/LoadingOrder?orderId=${orderId}`);
          } else if (orderData.payment) {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            router.push(`/cancel?orderId=${orderId}`);
          }
        } else {
          console.log("Order not found yet, checking again...");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        router.push('/cancel'); // Redirect on error
      }
    };

    // Start periodic checking
    intervalId = setInterval(checkOrder, 3000); // Check every 3 seconds

    // Stop checking after 30 seconds to prevent infinite loops
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setIsChecking(false);
      console.error("Order not found within timeout");
      router.push('/cancel'); // Redirect after timeout
    }, 30000); // 30 seconds timeout

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [orderId, router]); // Depend on `orderId` and `router`

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Checking your payment...</h1>
      {isChecking && (
        <div style={{ marginTop: '20px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '6px solid #ccc',
              borderTop: '6px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
            }}
          ></div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingOrder;
