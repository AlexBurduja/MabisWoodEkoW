import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FcCancel } from 'react-icons/fc'
import { db } from '../../firebase-config';

function CancelPage() {
    const [order,setOrder] = useState(null)
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

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
    <div className='cancelFlex'>
        
        <div className='cancelBackground'>

            <div className='cancelIcon'>
                <FcCancel  className='cancelIcon__icon'/>  
            </div>

            <div className='cancelTitle'>
                <h1>Failed / Canceled</h1>
            </div>

            <div className='cancelButtonsAndText'>
                <div>
                    <p>Payment failed/canceled.</p>
                    {order ? 
                    <p>{order.payment?.message}</p>
                    :
                    <p>No Message</p>
                }
                    <p>What do you wish to do next?</p>
                </div>
                
                <div className='cancelButtonsAndText__buttons'>
                    <Link href='/cart'>To Cart!</Link>
                    <Link href='/'>To Home!</Link>
                </div>
            </div>
        
        </div>
    
    </div>
  )
}

export default CancelPage
