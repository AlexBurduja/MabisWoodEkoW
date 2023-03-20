import Link from 'next/link'
import React from 'react'
import { FcCancel } from 'react-icons/fc'

function CancelPage() {
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
