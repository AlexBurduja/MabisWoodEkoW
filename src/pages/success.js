'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { db } from '../../firebase-config';
import { getDatabase } from 'firebase/database'
import { doc, getDoc } from 'firebase/firestore';

function Success() {
  const [order, setOrder] = useState({})
  const [status, setStatus] = useState()
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId')
  
  useEffect(() => {
    
  const getOrder = async () => {
    const ref = doc(db, `orders/${orderId}`)
  
    const data = await getDoc(ref)
    setOrder(data.data())
    console.log(order)
  };

  getOrder();
  }, [])

  useEffect(() => {
    console.log(order)
  }, [order])


  return (
    <div>
      {order && order.payment && order.payment.status === 3 ? 
      "Payment was successfull" : 
      order && order.payment.status !== 3 ?
      "Payment was not successfull!" : 
      "Loading"}
  
      { orderId }
    </div>
  );
}

export default Success;