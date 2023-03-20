import React, { useState } from "react";
import {  motion } from "framer-motion";
import logo from "../publicResources/logoMabis.svg"
import { AiOutlineEye } from "react-icons/ai"
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

export function Login(){

  const ParticlesBackground = dynamic(
    () => import("../components/particlesJS/particleJsComponent"),
    { ssr: false }
  );

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [errorMsg, setErrorMsg] = useState('')

    const router = useRouter();

    const [passwordShow, setPasswordShow] = useState(false)
    const togglePassword = () => {
      setPasswordShow(!passwordShow)
    }


    function passwordChangeHandler(event){
        setLoginPassword(event.target.value)
    }

    function emailChangeHandler(event){
        setLoginEmail(event.target.value)
    }

    const login = async () => {
      try{
        const user = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        )

        router.push('/')
      }catch(err){
        if(err.code === 'auth/user-not-found'){
          toast.error(`The username or password you entered is incorrect.Please try again or reset your password!`)
        } else {
          toast.error('An error has occured.')
        }
      }
    }
    
    return (
      <>
      <ParticlesBackground />
      <ToastContainer />
      <section className="loginWrapper">
        <div className="wrapperOfWrapper">

        <div className="leftRegion">

        <div>
          <Image className="loginLogo" src={logo} width={350} alt="logo" />
        </div>

        <div>
          <p>Welcome!</p>
        </div>

        <div>
          Log in to have full access!
        </div>

        <div>
          <p>www.mabiswoodeko.com</p>
        </div>
          
        </div>

          <div className="LoginRightSide">
          <h1>Log in</h1>

            <section  className="loginForm">

                <div className="inputBoxes">
                    <input id="email" type="text" onChange={emailChangeHandler} autoComplete="true" required></input>
                    <span>Email</span>
                    <p className="error">{emailError}</p>
                </div>

                <div className="inputBoxes">
                    <input id="password" type={passwordShow ? "text" : "password"} onChange={passwordChangeHandler} required></input>
                    <span>Password</span>
                    <p className="error">{passwordError}</p>
                    <p className="eyeIcon" onClick={togglePassword}><AiOutlineEye/></p>
                </div>

                <motion.button 
                onClick={login}
                className="submitButtonLogin"
                whileHover={{scale: 0.99}}
                whileTap={{scale:0.9}}
                >

                  Login
                </motion.button>
              </section>

            <div>
                
                <p> Don&apos;t have an account? <Link href="/register">Register</Link> </p>
                <p>Forgot password ? <Link href="/forgotpassword">Reset password</Link></p>
            </div>
            </div>
        </div>
      </section>
    </>
    )
}

export default Login