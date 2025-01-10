import axios from "axios";
import { useState } from "react";

const PaymentPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handlePayment = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.post('/api/payment', {
          orderId: '12345',
        });
        
    
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl; 
        } else {
          setError('Failed to get redirect URL.');
        }

      } catch (err) {
        console.error('Payment Error:', err);
        setError('An error occurred while processing your payment.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <h1>Payment Page</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    );
  };
  
  export default PaymentPage;
  