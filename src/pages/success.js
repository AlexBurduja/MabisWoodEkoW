import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PaymentStatus = () => {
  const router = useRouter();
  const { orderId } = router.query;  // Get the orderId from the URL
  const [status, setStatus] = useState(null);  // State to store the payment status

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        // Make a POST request to the payment confirmation API
        const response = await fetch('/api/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: { id: orderId }, payment: { status: 3 } })  // You can use a mock payment status here
        });

        const data = await response.json();
        
        if (data.errorCode === 0) {
          // Store the status in the state
          setStatus(data.status);
        } else {
          console.error('Error processing payment');
        }
      } catch (error) {
        console.error('Request failed', error);
      }
    };

    if (orderId) {
      fetchPaymentStatus();
    }
  }, [orderId]);

  useEffect(() => {
    if (status !== null) {
      // Wait a bit before performing the redirect based on the status
      const timer = setTimeout(() => {
        if (status === 3) {
          console.log('Payment successful');
          router.replace(`/success?orderId=${orderId}`);
        } else {
          console.log('Payment failed or canceled');
          router.replace(`/cancel?orderId=${orderId}`);
        }
      }, 2000);

      return () => clearTimeout(timer);  // Cleanup the timer if the component unmounts
    }
  }, [status, orderId, router]);

  return (
    <div>
      <p>Processing your payment...</p>
      <p>Please wait while we confirm the status.</p>
      {/* A simple loading spinner or animation */}
      <div className="spinner"></div>
    </div>
  );
};

export default PaymentStatus;
