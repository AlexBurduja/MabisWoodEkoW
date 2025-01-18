import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PaymentStatus = () => {
  const router = useRouter();
  const { orderId, status } = router.query;  // Get the status from the URL

  useEffect(() => {
    // Wait a bit before performing the redirect
    const timer = setTimeout(() => {
      if (status === '3') {
        // Payment successful, redirect to success page
        router.replace(`/success?orderId=${orderId}`);
      } else {
        // Payment failed or canceled, redirect to cancel page
        router.replace(`/cancel?orderId=${orderId}`);
      }
    }, 2000);  // Add a slight delay to display the loading spinner

    return () => clearTimeout(timer);  // Cleanup the timer if the component unmounts
  }, [orderId, status, router]);

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
