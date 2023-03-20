import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import React, {  useContext, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import SignUpInfo from '../components/auth/Register/SignUpInfo';
import PersonalInfo from '../components/auth/Register/PersonalInfo';
import Adress from '../components/auth/Register/Adress';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';



export function Register() {

  const ParticlesBackground = dynamic(
    () => import("../components/particlesJS/particleJsComponent"),
    { ssr: false }
  );

const router = useRouter();

const [page, setPage] = useState(0)
const [formData , setFormData] = useState({
  email : '',
  password : '',
  confirmPassword: '',
  firstName : '',
  lastName : '',
  street : '',
  streetNo: '',
  apartNo: '',
  block : '',
  phoneNumber : '',
  check : false
})


const FormTitles = ["Sign Up", "Personal Info", "Address"]

const PageDisplay = () => {
  if (page === 0){
    return <SignUpInfo formData={formData} setFormData={setFormData}/>
  } else if (page === 1) {
    return <PersonalInfo formData={formData} setFormData={setFormData}/>
  } else {
    return <Adress formData={formData} setFormData={setFormData}/>
  }
}

const today = new Date();
const date = today.toLocaleDateString();
const time = today.toLocaleTimeString();

const registerO = async (event) => {
  try{
    const user = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    await setDoc(doc(db,"users", user._tokenResponse.localId), {
      email : formData.email,
      firstName : formData.firstName,
      lastName : formData.lastName,
      phoneNumber : formData.phoneNumber,
      street : formData.street,
      streetNo : formData.streetNo,
      apartNo : formData.apartNo,
      block : formData.block,
      admin: false,
      createdAt: `${date} ${time}`
    })

    toast.success("Thanks for taking your time with creating an account!", {
      autoClose: 1000
    })

    setTimeout(() => {
      router.push("/")
    }, 1500)

  } catch (e){
    toast.error("Something went wrong! It's possible that this is caused because email is already linked to a account!", {
      autoClose:6000
    })
  }
}


const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
const upperCaseRegex = /[A-Z]/;
const numberRegex = /[0-9]/;

function page0() {

  const emailValid = validateEmail(formData.email)
  const passValid = validatePassword(formData.password)

  function validateEmail(registerEmail) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(registerEmail);
  }

  if(!emailValid){
      toast.error("Email is not valid!", {
        autoClose: 6000
      })
    }

  function validatePassword(password){
  
    if(password.length < 6){
      toast.error("Password need to have 6 letters or more.", {
        autoClose:6000
      })
    }

    if(password !== formData.confirmPassword){
      
        toast.error("You need to enter the same password!", {
          autoClose: 6000
          })
        
      return false
    }

    if(!specialCharRegex.test(password)){
     
      toast.error("Password must contain at least one special character.", {
        autoClose:6000
      });

      return false
    }

    if(!numberRegex.test(password)){

      toast.error("Password must contain at least one number.", {
        autoClose:6000
      });

      return false
    }

    if(!upperCaseRegex.test(password)){
      
      toast.error("Password must contain at least one uppercase letter.", {
        autoClose:6000
      });
      
      return false
    }

  return true
}

if(!emailValid || !passValid){

  setPage(0);
} else {
  setPage(1)
}

}

function page1(){
  const firstNameValid = validateFirstName(formData.firstName)
  const lastNameValid = validateLastName(formData.lastName)
  const phoneValid = validatePhoneNumber(formData.phoneNumber)
  
  function validateFirstName(firstName){

    if(firstName.length === 0){
      
      toast.error("First name can't be empty.", {
        autoClose: 6000
      })
      
      return false
      }

    if(specialCharRegex.test(firstName)){

      toast.error("First name can't contain special characters.", {
        autoClose:6000
      })

      return true
    }

    if(!upperCaseRegex.test(firstName)){

      toast.error("First name needs to have the first letter as uppercase.", {
        autoClose:6000
      })

      return false
    }

    if(numberRegex.test(firstName)){
      toast.error("First name can't contain numbers!", {
        autoClose:6000
      })

      return false
    }

      return true;
  }

  function validateLastName(lastName){
    if(lastName.length === 0) {

      toast.error("Last name can't be empty", {
        autoClose:6000
      })

      return false
    }

    if(specialCharRegex.test(lastName)){

      toast.error("Last name can't contain special characters.", {
        autoClose:6000
      })

      return false
    }

    if(!upperCaseRegex.test(lastName)){
      toast.error("Last name needs to have the first letter as uppercase.", {
        autoClose:6000
      })

      return false
    }

    if(numberRegex.test(lastName)){
      toast.error("Last name can't contain numbers!", {
        autoClose:6000
      })

      return false
    }

    return true
  }

  function validatePhoneNumber(phoneNumber){
    if(phoneNumber.length === 0){
      toast.error("Phone number can't be left empty!" , {
        autoClose: 6000
      })
      
      return false
    }

    if(phoneNumber.length > 10){
      toast.error("Phone number can't exceed 10 digits!", {
        autoClose:6000
      })

      return false
    }

    if(/[a-zA-z]/.test(phoneNumber)){
      toast.error("Phone number can't contain letters!", {
        autoClose:6000
      })

      return false
    }

    if(specialCharRegex.test(phoneNumber)){
      toast.error("Phone number can't contain special characters! No prefix needed for phone numbers!", {
        autoClose:6000
      })

      return false
    }

    return true
  }

    if(!firstNameValid || !lastNameValid || !phoneValid){
      setPage(1)
    } else {
      setPage(2)
    }
}

function page2(){
  const strretValid = validateStreet(formData.street)
  const streetNoValid = validateStreetNo(formData.streetNo)
  const apartamentValid = validateApartamentNo(formData.apartNo)
  const blockValid = validateBlockNo(formData.block)

  function validateStreet(street){
    if(street.length === 0){
      toast.error("Street can't be empty!", {
        autoClose:6000
      })
      return false
    }

    if(numberRegex.test(street)){
      toast.error(`Street can't contain numbers! Check "Street No" field below for that.`, {
        autoClose:6000
      })
      return false
    }

    if(specialCharRegex.test(street)){
      toast.error("Street can't contain special characters!", {
        autoClose:6000
      })
      return false
    }



    return true
  }

  function validateStreetNo(streetNo){
    if(streetNo.length === 0){
      toast.error("Street No. can't be empty." , {
        autoClose: 6000
      })
      return false
    }

    if(/[a-zA-Z]/.test(streetNo)){

      toast.error("Street No. can't contain letters! ", {
        autoClose:6000
      })

      return false
    }

    if(specialCharRegex.test(streetNo)){
      toast.error("Street No. can't contain special characters!", {
        autoClose: 6000
      })

      return false
    }
    
    return true
  }

  function validateApartamentNo(apartamentNo){
    if(apartamentNo.length === 0 ){
      toast.error("Apartament No. can't be empty.", {
        autoClose:6000
      })
      return false
    }

    if(/[a-zA-Z]/.test(apartamentNo)){
      toast.error("Apartament No. can't contain letters!", {
        autoClose:6000
      })

      return false
    }

    if(specialCharRegex.test(apartamentNo)){
      toast.error("Apartament No. can't contain special characters!", {
        autoClose:6000
      })
      return false
    }

    return true
  }

  function validateBlockNo(block){
    if(block.length === 0){
      toast.error("Block No. can't be empty!", {
        autoClose:6000
      })
      
      return false
    }

    if(/[a-zA-Z]/.test(block)){
      toast.error("Block No. can't contain letters!", {
        autoClose:6000
      })
      return false
    }

    if(specialCharRegex.test(block)){
      toast.error("Block No. can't contain special characters!", {
        autoClose:6000
      })
      return false
    }
    return true
  }

  if(!strretValid || !streetNoValid || !apartamentValid || !blockValid || !formData.check === true){
    toast.error('Terms and conditions need to be read and agreed to.')
    return
  } else {
    registerO()
  }
}


  return (
    <>
      <div className='form'>
      <ParticlesBackground />
      <ToastContainer />
        <div className='progressbar'>
          <div className='progressbarTransaction' style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%", transition: "width ease-in 1s"}}></div>
        </div>
        <div className='form-container'>
          <div className='header'>
            <h1>{FormTitles[page]}</h1>
          </div>
          <div className='body'>
            {PageDisplay()}
          </div>
          <div className='footer'>
            <button
            disabled={page === 0} 
            onClick={() => {setPage((currPage) => currPage - 1)}}>Previous</button>
            <button 
            // disabled={page === FormTitles.length - 1}
            onClick={() => {
              if(page === 0){
                page0();
              } else if(page === 1){
                page1()
              }else if(page === 2) {
                page2()
              }
              }}>
              {page === FormTitles.length - 1 ? "Submit" : "Next"}
              </button>
          </div>

          <span style={{textAlign: 'center'}}>Back to <Link href='/login'>login!</Link></span>
        </div>
      </div>
    </>
  );
}

export default Register
