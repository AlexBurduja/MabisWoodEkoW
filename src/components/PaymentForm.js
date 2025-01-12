import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState(null);

  const handleSubmit = async (values) => {
    const browserInfo = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      colorDepth: window.screen.colorDepth,
      userAgent: navigator.userAgent,
      language: navigator.language,
      javaEnabled: navigator.javaEnabled(),
    };

    try {
      const { data } = await axios.post('/api/payment/start', {
        invoiceData: values,
        browserInfo,
      });
      
      if (data.paymentURL) {
        // Redirect directly to the payment URL
        window.location.href = data.paymentURL;
      } else {
        console.error('No payment URL received');
      }

    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          amount: '',
          city: '',
          state: '',
          postalCode: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="John" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" placeholder="john@example.com" />
          </div>
          <div>
            <label htmlFor="amount">Amount (RON)</label>
            <Field id="amount" name="amount" type="number" placeholder="100.00" />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <Field id="city" name="city" placeholder="City" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <Field id="state" name="state" placeholder="State" />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <Field id="postalCode" name="postalCode" placeholder="Zip Code" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default PaymentForm;
