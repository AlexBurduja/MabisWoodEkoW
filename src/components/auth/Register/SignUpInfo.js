import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'

function SignUpInfo({ formData, setFormData }) {
    function saveEmail(event){
        setFormData({...formData, email: event.target.value})
    }
  
    function savePassword(event){
        setFormData({...formData, password: event.target.value})
    }
  
    function saveConfirmPassword(event){
        setFormData({...formData, confirmPassword: event.target.value})
    }
  
    const [passwordShow, setPasswordShow] = useState(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)
  
    const togglePassword = () => {
      setPasswordShow(!passwordShow)    
    }
  
    const confirmTogglePassword = () => {
      setConfirmPasswordShow(!confirmPasswordShow)    
    }

    return (
   
    <div className='wrapperCenter'>
                <div className="inputBoxes">
                    <input id="email" type="text" required value={formData.email} 
                    onChange={saveEmail}/>
                    <span>Email</span>
                </div>

                <div className="inputBoxes">
                    <input id="password" type={passwordShow ? "text" : "password"} required value={formData.password} onChange={savePassword}/>
                    <span>Password</span>
                    <p className="eyeIcon" onClick={togglePassword}><AiOutlineEye/></p>
                </div>

                <div className="inputBoxes confirmPassword">
                    <input id="confirmPassword" type={confirmPasswordShow ? "text" : "password"} required value={formData.confirmPassword} onChange={saveConfirmPassword} />
                    <span>Confirm Pass</span>
                    <p className="eyeIcon" onClick={confirmTogglePassword}><AiOutlineEye/></p>
                <div className='checkboxDiv'>
                </div>


    </div>

    </div>    
  )
}

export default SignUpInfo
