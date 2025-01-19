import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Success() {
  
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId'); // Retrieve orderId from URL
    const [order, setOrder] = useState(null)

    useEffect(() => {
    if (!orderId) {
        console.error("Order ID is missing from the URL");
        return;
    }

    const checkOrder = async () => {
      try {
        const ref = doc(db, `orders/${orderId}`);
        const data = await getDoc(ref);
        if (data.exists()) {
            const orderData = data.data();
            setOrder(orderData);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      
      };
    };

    checkOrder();
    }, [])

    return (
    <div>
      <p>Success Page</p>
      <p>{order.payment?.message}</p>
      <p>{order.payment?.amount}</p>
    </div>
  )
}

export default Success
