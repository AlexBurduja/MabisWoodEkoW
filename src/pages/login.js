import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../src/publicResources/logoMabis.svg"
import { AiOutlineEye } from "react-icons/ai"
import ParticlesBackground from "../components/particlesJS/particleJsComponent";
import { NavLink } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login(){
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
        console.log(err.message)
      }
    }
    

    function validateEmail(email){
        // eslint-disable-next-line no-control-regex
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

        const emailValid = emailRegex.test(email);

        if(!emailValid){
            setEmailError("Please enter a valid email");
        }

        return emailValid;
    }

      function validatePassword(password) {
        const specialCharacterList = [
          '!', '@', '#', '$', '%', '^', '&', '*'
        ];
    
        if (!(password.length >= 6)) {
          setPasswordError('Password must contain at least 6 characters');
    
          return false;
        }
    
        let hasUpperCaseCharacter = false;
        let hasNumberCharacter = false;
        let hasSpecialCharacter = false;
    
        for (let letter of password) {
          if (
            !specialCharacterList.includes(letter) 
            && Number.isNaN(Number(letter)) 
            && letter === letter.toUpperCase()
          ) {
            hasUpperCaseCharacter = true;
          }
    
          if (typeof Number(letter) === 'number') {
            hasNumberCharacter = true;
          }
    
          if (specialCharacterList.includes(letter)) {
            hasSpecialCharacter = true;
          }
        }
    
        if (!hasUpperCaseCharacter) {
          setPasswordError('Your password must have at least one upper case character');
        }
    
        if (!hasNumberCharacter) {
          setPasswordError('Your password must include at least one number');
        }
    
        if (!hasSpecialCharacter) {
          setPasswordError('Your password must include at least one special character');
        }
    
        if (hasUpperCaseCharacter && hasNumberCharacter && hasSpecialCharacter) {
          return true;
        }
    
        return false;
      }


    return (
      <>
      <ParticlesBackground />
      <section className="loginWrapper">
        <AnimatePresence>
          {errorMsg && (
            <motion.h1
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity:0}}
            transition={{ease: "easeInOut", duration:2}}
            className="errorMsgAccNotFound"
            >
              {errorMsg}
            </motion.h1>
          )}
        </AnimatePresence>
        <div className="wrapperOfWrapper">

        <div className="leftRegion">

        <div>
          <Image className="loginLogo" src={logo} alt="logo" />
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