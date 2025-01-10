import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Pay({ payload }) {
  const router = useRouter();

  useEffect(() => {
    if (payload) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandboxsecure.mobilpay.ro';

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'data';
      input.value = payload;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    }
  }, [payload]);

  return <p>Redirecting to Netopia...</p>;
}

Pay.getInitialProps = async ({ query }) => {
  return { payload: query.payload || null };
};
