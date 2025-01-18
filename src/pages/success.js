'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation'

function Success() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId')
  console.log(orderId)

  return (
    <div>
      { orderId }
    </div>
  );
}

export default Success;
