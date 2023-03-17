import React from 'react'
import { FaKey } from 'react-icons/fa'
import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'

function ForgotPassPage() {
    const [email , setEmail] = useState('')

    function emailChangeHandler(e){
        setEmail(e.target.value)
    }

    function resetPass() {
        const auth = getAuth()
        
        sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' })
        .then(() => {
            toast.success('Email sent!')
        })
        .catch((error) => {
            if(error.code === 'auth/user-not-found'){
                toast.error("Email does not belong to any account!")
            } else {
                console.log(error)
            }
        });
    }

    return (
    <div className='passFlex'>
        <ToastContainer />
        <div className='passBackground'>
            <div className='passBackground__icon'>
                <FaKey />
            </div>

            <div>
                <p>Forgot password ?</p>
            </div>

            <div className='forgotPassText'>
                <p>Enter your email!</p>
                <p>You will get a email with a link for resetting your password!</p>
            </div>

            <div className="inputBoxes forgotPass">
                    <input id="email" type="text" value={email} onChange={emailChangeHandler} autoComplete="true" required></input>
                    <span>Email</span>
             </div>
            
            <button onClick={resetPass}>Send</button>

            <p>Back to <Link href='/login'>login!</Link></p>
        </div>
    </div>
  )
}

export default ForgotPassPage
