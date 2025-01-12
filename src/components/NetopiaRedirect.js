import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const NetopiaRedirect = ({ payment }) => {
  const router = useRouter();
  const ref = useRef();

  useEffect(() => {
    if (payment?.paymentURL) {
      ref.current.click();
    }
  }, [payment]);

  if (!payment?.paymentURL) {
    return null;
  }

  return (
    <button
      className="hidden"
      onClick={() => window.location.href(payment.paymentURL)}
      ref={ref}
      type="button"
    />
  );
};

export default NetopiaRedirect;
