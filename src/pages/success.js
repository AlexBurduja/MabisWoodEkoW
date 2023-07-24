import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import emailjs from "emailjs-com"
import {FiCheckCircle} from 'react-icons/fi'
import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { FirebaseAuthContext } from '../../FirebaseAuthContext'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'

const hi = (email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo, total) => {
  emailjs.send('service_eyuz8pg', 'template_xeem2dd', {
    subject: `Comanda de la ${email} (${firstName} ${lastName})`,
    metoda: `${firstName} ${lastName} a facut o plata in valoare de ${total} RON`,

    name : `Nume : ${firstName} ${lastName} ( ${email} )`,
    phone: `Telefon : <b>${phoneNumber}</b>`,
    street : `Strada :<b>${street}</b>`,
    streetNo: `Nr. :<b>${streetNo}</b>`,
    bloc : `Bloc : <b>${block}</b>`,
    apartNo : `Apartament : <b>${apartamentNo}</b>`,
  }, 'crU6K8bQnftB81z-j')
};

const SuccessPage = () => {

  const { user } = useContext(FirebaseAuthContext)

  const [countdown, setCountdown] = useState(5)
  const router = useRouter()
  
  useEffect(() => {
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const street = localStorage.getItem("street");
    const streetNo = localStorage.getItem("streetNo");
    const block = localStorage.getItem("block");
    const apartamentNo = localStorage.getItem("apartamentNo");
    const isCompanyChecked = localStorage.getItem("isCompanyChecked");
    const companyName = localStorage.getItem("companyName");
    const companyCui = localStorage.getItem("companyCui");
    const total = localStorage.getItem("total");


    let intervalId;
    let timeoutId;

    const startCountdown = () => {
      
      intervalId = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);

      timeoutId = setTimeout(() => {
        router.push('/')
      }, 5000);
    
    };

    const deleteCartUponSuccess = async () => {
      
      if(user?.uid){
        
        const userDoc = collection(db, `users/${user.uid}/cart`)
        
        const q =await getDocs(userDoc)
        
        const batch = writeBatch(db)
        q.forEach(doc => {
        batch.delete(doc.ref)
      })
      
      batch.commit()
    }
  
    if(!user?.uid){
      const clientId = sessionStorage.getItem("clientId")
  
      const userDoc = collection(db, `guestCarts/${clientId}/cart`)
      
      const q =await getDocs(userDoc)
      
      const batch = writeBatch(db)
      q.forEach(doc => {
        batch.delete(doc.ref)
      })
      
      batch.commit()
    }
  
  }

    if(!email ||!firstName || !lastName || !phoneNumber){
      toast.error("You should not be here! Redirecting to home page.")
      router.push('/')
      return;
    } else {
      hi(email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo, total);

      startCountdown()

      setTimeout(() => {
        deleteCartUponSuccess();
        localStorage.removeItem("email")
        localStorage.removeItem("firstName")
        localStorage.removeItem("lastName")
        localStorage.removeItem("phoneNumber")
        localStorage.removeItem("street")
        localStorage.removeItem("streetNo")
        localStorage.removeItem("block")
        localStorage.removeItem("apartamentNo")
        localStorage.removeItem("total")
        localStorage.removeItem("companyCui")
        localStorage.removeItem("companyName")
        localStorage.removeItem("isCompanyChecked")
        localStorage.removeItem("total")
      }, 4800)
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };

  }, [router, user?.uid]);

    return (
      <div className='successFlex'>
      <ToastContainer />
      <div className='successBackground'>

      <div className='successIcon'>
        <FiCheckCircle  className='successIcon__icon'/>
      </div>

      <div>
        <h1>Success</h1>
      </div>
      
      <div className='successText'>
        <p>We received your purchase request.</p>
        <p>We&apos;ll be in touch shortly. :)</p>
      </div>

      {countdown}

      </div>
    </div>  
  )
}

export default SuccessPage
