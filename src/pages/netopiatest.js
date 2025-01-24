// "use client"
import PaymentForm from '@/components/PaymentForm';
import axios from 'axios';
import React from 'react'

function NetopiaTest() {

  async function downloadInvoice() {
    try {
        const response = await fetch('/api/invoice/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the invoice.');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'invoice.pdf'; // Default file name
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading the invoice:', error.message);
    }
}



  return (
    <div>
    {/* <PaymentForm /> */}
    <button onClick={downloadInvoice}>Invoice?</button>
    </div>
  )
}

export default NetopiaTest
