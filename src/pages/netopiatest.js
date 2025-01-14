"use client"
import PaymentForm from '@/components/PaymentForm';
import axios from 'axios';
import React from 'react'

function NetopiaTest() {

const getIp = async () => {
  try {
    const response = await fetch('/api/payment/ip', {
      method: "POST"
    })

    const json = await response.json();
    console.log(json)
  } catch (e) {
    console.log(e)
  }

}
  return (
    <div>
    <PaymentForm />

    <button onClick={getIp}>Get IP?</button>
    </div>
  )
}

export default NetopiaTest
