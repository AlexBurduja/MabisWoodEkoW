'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation'
import { db } from '../../firebase-config';

function Success() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId')
  
  
  const ref = ref(db, `orders/${orderId}`)

  return (
    <div>
      { orderId }
    </div>
  );
}

export default Success;
