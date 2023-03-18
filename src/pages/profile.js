import { useContext,  useEffect,  useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { FirebaseAuthContext } from "../../FirebaseAuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {  db } from "../../firebase-config";
import { getAuth, sendPasswordResetEmail, updateEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { Footer } from "../components/reusableComponents/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import TopScrollProgress from "@/components/reusableComponents/TopScrollProgress";
import { BackToTop } from "@/components/reusableComponents/BackToTop";
import Header from "@/components/reusableComponents/Header";
import { PreFooter } from "@/components/reusableComponents/PreFooter";

export default function ProfilePage() {
    const { user } = useContext(FirebaseAuthContext)
    const router = useRouter();

    const [ email, setEmail ] = useState(user.email)
    const [ oldEmail, setOldEmail ] = useState("")
    const [newEmail, setNewEmail] = useState("")
    
      const auth = getAuth()

      const triggetResetEmail = async () => {
        sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' })
        
        toast.success(`Password reset sent to ${email}!`)
        
        router.push('/login')
      }
      
    
    
    useEffect(() => {
      if(user?.uid){
        const getDocument = async () => {
          const ref = doc(db, 'users', user.uid)
          
          const document = await getDoc(ref)
          
          setConditional(document.data())
        }
        getDocument()
      }
      
    }, [user?.uid])

    const [language, setLanguage] = useState("GB");

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      setLanguage(lang);
    }
  }, []);
    
    const [conditional, setConditional] = useState([])
    const [ firstName, setFirstName] = useState(conditional.firstName)
    const [ lastName, setLastName] = useState(conditional.lastName)
    const [phoneNumber , setPhoneNumber] = useState("")
    const [street, setStreet] = useState(conditional.street)
    const [streetNo, setStreetNo] = useState(conditional.streetNo)
    const [blockNo, setBlockNo] = useState(conditional.block)
    const [apartNo, setApartNo] = useState(conditional.apartNo)

    useEffect(() => {
      setEmail(user.email)
      setFirstName(conditional.firstName)
      setLastName(conditional.lastName)
      setPhoneNumber(conditional.phoneNumber)
      setStreet(conditional.street)
      setStreetNo(conditional.streetNo)
      setBlockNo(conditional.block)
      setApartNo(conditional.apartNo)
    }, [conditional, user?.email])
  


    function changeFirstName(event){
      setFirstName(event.target.value)
    }

    function changeLastName(event){
      setLastName(event.target.value)
    }
    
    function changePhoneNumber(event){
      setPhoneNumber(event.target.value)
    }

    function changeStreet(event){
      setStreet(event.target.value)
    }

    function changeStreetNo(event){
      setStreetNo(event.target.value)
    }

    function changeBlockNo(event){
      setBlockNo(event.target.value)
    }

    function changeApartNo(event){
      setApartNo(event.target.value)
    }

    function changeOldEmail(event){
        setOldEmail(event.target.value)
    }

    function changeNewEmail(event){
      setNewEmail(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
    
        const firstnameValid = validateFirstName(firstName)
        const lastnameValid = validateLastName(lastName)
        const phoneNumberValid = validatePhoneNumber(phoneNumber)
        const streetValid = validateStreet(street)
        const streetNoValid = validateStreetNo(streetNo)
        const blockValid = validateBlock(blockNo)
        const apartNoValid = validateApartamentNo(apartNo)

    
        if ( !firstnameValid || !lastnameValid || !phoneNumberValid || !streetValid || !streetNoValid || !blockValid || !apartNoValid ) {
            return ;
        } else {
          const body = {
            apartNo : apartNo,
            block : blockNo,
            firstName : firstName,
            lastName : lastName,
            phoneNumber : phoneNumber,
            street : street,
            streetNo : streetNo
          }
          const ref = doc(db, `users/${user.uid}`)
          updateDoc(ref, body)
          toast.success("Profile Updated!", {
            autoClose: 1000
          })
        }

    
}


function validateEmail(newEmail) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(newEmail);
}

function validateFirstName(firstName){
const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

if(firstName.length === 0){
    return false
  }

if(firstName.match(/\d/)){
  
    toast.error("First name can't contain numbers!", {
      autoClose: 6000,
      className: "toastContainer"
    })

  return false
} 

 if(specialChars.test(firstName)){
//   setFirstNameError("First name can't contain special characters!")

  toast.error("First name can't contain special characters!", {
    autoClose: 6000
    })

  return false
}

if(/[a-z]/.test(firstName.charAt(0))){
    toast.error("First name's first character needs to be uppercase!", {
      autoClose: 6000
    })

  return false
}
  return true;
}

function validateLastName(lastName){
const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

if(lastName.length === 0 ){
  return false
}

if(lastName.match(/\d/)){
  
  
    toast.error("Last name can't contain numbers!", {
      autoClose:6000
    })
  
  return false
} 

if(specialChars.test(lastName)){
  
  
    toast.error("Last name can't contain special characters!", {
      autoClose: 6000
    })

  return false
}

if(/[a-z]/.test(lastName.charAt(0))){
  
    toast.error("Last name's first character needs to be uppercase!", {
      autoClose: 6000
    })

  return false
}


  return true;
}

function validatePhoneNumber(phoneNumber){
  const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

  if(phoneNumber.length === 0){
    return false
  }

  if(phoneNumber.length > 10){

      toast.error("Phone number can't exceed 10 digits!", {
        autoClose: 6000
      })

    return false
  }

  if(/[a-zA-Z]/.test(phoneNumber)){
      toast.error("Phone number can't contain letters!", {
        autoClose: 6000
      })
    return false
  }

  if(specialChars.test(phoneNumber)){
  
      toast.error("Phone number can't contain special characters! No prefix needed!", {
        autoClose:6000
      })
    
    return false
  } 

  return true;
}

function validateStreet(street){

  const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

  if(street.length === 0){
    return false
  }

  if(street.match(/\d/)){
    
      toast.error("Street can't contain numbers! Input Street No.below.", {
        autoClose: 6000
      })
    return false
  }

  if(specialChars.test(street)){
      toast.error("Street can't contain special characters!", {
        autoClose:6000
      })
    return false
  }

  return true
}

function validateStreetNo(streetNo){
  const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

  if(streetNo.length === 0){
    return false
  }

  if(/[a-zA-Z]/.test(streetNo)){

      toast.error("Street No. can't contain letters!", {
        autoClose: 6000
      })
    return false
  }

  if(specialChars.test(streetNo)){
  
      toast.error("Street No. can't contain special characters! No prefix needed!", {
        autoClose:6000
      })
    return false
}

 return true
}

function validateBlock(block){
  const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

  if(block.length === 0){
    return false
  }

  if(/[a-zA-Z]/.test(block)){
      toast.error("Phone number can't contain letters!", {
        autoClose: 6000
      })
    return false
  }

  if(specialChars.test(block)){
  
      toast.error("Phone number can't contain special characters! No prefix needed!", {
        autoClose:6000
      })
    return false
}
return true
}

function validateApartamentNo(apartamentNo){
  const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

  if(apartamentNo.length === 0){
    return false
  }

  if(/[a-zA-Z]/.test(apartamentNo)){
      toast.error("Phone number can't contain letters!", {
        autoClose: 6000
      })
    return false
  }

  if(specialChars.test(apartamentNo)){
  
      toast.error("Phone number can't contain special characters! No prefix needed!", {
        autoClose:6000
      })
    return false
}
return true
}

function deleteAccount(event) {
    event.preventDefault()
    
}

const [modalDeleteButton, setModalDeleteButton] = useState(false);

const toggleModalDeleteButton = () => {
  setModalDeleteButton(!modalDeleteButton)
};

useEffect(() => {
  if(modalDeleteButton && typeof window !== 'undefined') {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  };
}, [modalDeleteButton])

const [modalSubmitButton, setModalSubmitButton] = useState(false);

const toggleModalSubmitButton = () => {
  setModalSubmitButton(!modalSubmitButton)
};

useEffect(() => {
  if(modalSubmitButton && typeof window !== 'undefined') {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
}, [modalSubmitButton])

const [modalEditEmail, setModalEditEmail] = useState(false);

const toggleModalEditEmail = () => {
  setModalEditEmail(!modalEditEmail)
};

useEffect(() => {
  if(modalEditEmail && typeof window !== 'undefined') {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
}, [modalEditEmail])

function submitEmailChange() {
  const emailValid = validateEmail(newEmail)
  if(oldEmail !== user.email) {
    toast.error("Current email is not correct!", {
      autoClose: 1000
    })
  } else if (!emailValid) {
    toast.error("New email is not correct. Example : example@gmail.com", {
      autoClose: 1500
    })
  } else if (emailValid || oldEmail === user.email){
      updateEmail(auth.currentUser, newEmail).then(() => toast.success("Email changed! Back to login!")).catch((error) => console.log(error))
      
  };

}

    return (
        <>
        <TopScrollProgress />
        <BackToTop />
        <Header />
        <ToastContainer />
            <h1 className="profilePageh1">{conditional.firstName}&apos;s Profile Page</h1>  
            
            <section className="profilePageSection">
            
            <div className="profilePageSection_divL">
              
              <h2>{language === 'RO' ? 'Informatii despre profilul tau'
  : language === 'DE' ? 'Informationen zu Ihrem Profil'
  : language === 'FR' ? 'Informations concernant votre profil'
  : language === 'IT' ? 'Informazioni sul tuo profilo' :
  'Information regarding your profile'}</h2>
              
              <p>{language === 'RO' ? 'Daca doresti sa iti editezi datele de autentificare, modifica campurile cu noile informatii, apoi apasa butonul "EDITEAZA". In final, trebuie doar sa confirmi noile date de autentificare si gata! Esti pregatit sa continui!'
  : language === 'DE' ? 'Wenn Sie Ihre Anmeldeinformationen bearbeiten möchten, ändern Sie die Felder entsprechend den gewünschten neuen Anmeldeinformationen und klicken Sie dann auf die Schaltfläche "BEARBEITEN". Anschließend müssen Sie Ihre neuen Anmeldeinformationen bestätigen, und das war\'s! Sie sind bereit loszulegen!'
  : language === 'FR' ? 'Si vous souhaitez modifier vos informations d\'identification, modifiez les champs avec les nouvelles informations, puis cliquez sur le bouton "MODIFIER". Ensuite, vous devez confirmer vos nouvelles informations d\'identification, et c\'est tout ! Vous êtes prêt à continuer !'
  : language === 'IT' ? 'Se desideri modificare le tue credenziali del profilo, modifica i campi con le nuove informazioni, quindi fai clic sul pulsante "MODIFICA". Successivamente, è necessario confermare le nuove credenziali e poi sei a posto! Sei pronto a continuare!' : "If you wish to edit your profile credentials, change the fields to what your new credentials want to be, after that, click the 'EDIT' button, then, you need to confirm your new credentials, and that is it! You are good to go!"}</p>

            </div>
            <div className="profilePageSection_div">
                <form className="profilePageForm" onSubmit={handleSubmit}>

                        <label htmlFor="emailHeader">Email</label>
                        <input type="text" id="emailHeader" value={email} disabled={true}></input>
                        
                        <label htmlFor="firstName">{language === 'FR' ? 'Prénom' :
                                language === 'RO' ? 'Prenume' :
                                language === 'DE' ? 'Vorname' :
                                language === 'IT' ? 'Nome' :
                                'First name'}</label>
                        <input type="text" id="firstName" defaultValue={firstName} onChange={changeFirstName}></input>
                        
                        <label htmlFor="lastName">{language === 'FR' ? 'Famille Nom' :
                                language === 'RO' ? 'Nume de familie' :
                                language === 'DE' ? 'Nachname' :
                                language === 'IT' ? 'Cognome' :
                                'Last name'}</label>
                        <input type="text" id="lastName" defaultValue={lastName} onChange={changeLastName}></input>

                        <label htmlFor="phoneNumber">{language === 'FR' ? 'Téléphone' :
        language === 'RO' ? 'Număr de telefon' :
        language === 'DE' ? 'Telefonnummer' :
        language === 'IT' ? 'Telefono' :
        'Phone number'}</label>
                        <input type="number" id="phoneNumber" defaultValue={phoneNumber} onChange={changePhoneNumber}></input>

                        <label htmlFor="street">{language === 'FR' ? 'Rue' :
        language === 'RO' ? 'Strada' :
        language === 'DE' ? 'Straße' :
        language === 'IT' ? 'Via' :
        'Street'}</label>
                        <input type="text" id="street" defaultValue={street} onChange={changeStreet}></input>
                        
                        <label htmlFor="streetNo">{language === 'FR' ? 'Rue No.' :
                                language === 'RO' ? 'Nr. Strada' :
                                language === 'DE' ? 'Hausnummer' :
                                language === 'IT' ? 'Via No.' :
                                'Street No.'}</label>
                        <input type="text" id="streetNo" defaultValue={streetNo} onChange={changeStreetNo}></input>
                        
                        <label htmlFor="blockNo">{language === 'FR' ? 'Bloc' :
                                language === 'RO' ? 'Bloc' :
                                language === 'DE' ? 'Block' :
                                language === 'IT' ? 'Blocco' :
                                'Block'}</label>
                        <input type="text" id="blockNo" defaultValue={blockNo} onChange={changeBlockNo}></input>
                        
                        <label htmlFor="apartNo">{language === 'FR' ? 'Appartement No.' :
                                language === 'RO' ? 'Numarul apartamentului' :
                                language === 'DE' ? 'Wohnungsnummer' :
                                language === 'IT' ? 'Appartamento N.' :
                                'Apartament No.'}</label>
                        <input type="text" id="apartNo" defaultValue={apartNo} onChange={changeApartNo}></input>
                </form>
                
                <button type="button" onClick={toggleModalSubmitButton}> Edit </button>
                <button onClick={triggetResetEmail}>Reset password</button>
                {/* <button onClick={toggleModalEditEmail}> Change Email </button> */}
                <button onClick={toggleModalDeleteButton}>Delete</button>
            </div>



                {modalSubmitButton && (
                  
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    className="modal">
                        <div onClick={toggleModalSubmitButton} className="overlay"></div>
                    <div className="modal-content modal3">
                    <div>
                        <h1>Are you sure you want to change your credentials ?</h1>
                    </div>
                      
                    <p><span>{language === 'FR' ? 'Prénom: ' :
                                language === 'RO' ? 'Prenume: ' :
                                language === 'DE' ? 'Vorname: ' :
                                language === 'IT' ? 'Nome: ' :
                                'First name: '} </span>{firstName}</p>
                      
                      <p><span>{language === 'FR' ? 'Famille Nom :' :
                                language === 'RO' ? 'Nume de familie :' :
                                language === 'DE' ? 'Nachname :' :
                                language === 'IT' ? 'Cognome :' :
                                'Last name :'} </span>{lastName}</p>
                      
                      <p><span>{language === 'FR' ? 'Téléphone: ' :
        language === 'RO' ? 'Număr de telefon: ' :
        language === 'DE' ? 'Telefonnummer: ' :
        language === 'IT' ? 'Telefono: ' :
        'Phone number: '}</span>{phoneNumber}</p>
                      
                      <p><span>{language === 'FR' ? 'Rue: ' :
        language === 'RO' ? 'Strada: ' :
        language === 'DE' ? 'Straße: ' :
        language === 'IT' ? 'Via: ' :
        'Street: '}</span>{street} No.{streetNo}</p>
                      <p>Bl.{blockNo} {language === 'FR' ? 'Appartement No.: ' :
                                language === 'RO' ? 'Numarul apartamentului: ' :
                                language === 'DE' ? 'Wohnungsnummer: ' :
                                language === 'IT' ? 'Appartamento N.: ' :
                                'Apartament No.: '}{apartNo}</p>
                        
                        

                    <div className="modal3ButtonsWrapper"> 
                      <div className="modal3Buttons">
                        <button type="submit" onClick={handleSubmit} >Confirm</button>
                        <button onClick={toggleModalSubmitButton}>Cancel</button>
                      </div>
                    </div>
                    </div>
                    <ToastContainer />
                    </motion.div>
                )}

                {modalEditEmail && (
                  
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    className="modal">
                        <div onClick={toggleModalEditEmail} className="overlay"></div>
                    <div className="modal-content modal5">
                    <div>
                        <h1>Do you want to change your email ?</h1>
                    </div>
                      
                    <form className="emailModal">
                    
                    <div>
                        <label htmlFor="email">Current Email</label>
                        <input type="text" id="email" defaultValue={oldEmail} onChange={changeOldEmail}></input>
                    </div>
                    
                    <div>
                        <label htmlFor="email">New Email</label>
                        <input type="text" id="email" defaultValue={newEmail} onChange={changeNewEmail}></input>
                    </div>    
                    </form>  

                        

                    <div className="modal3ButtonsWrapper"> 
                      <div className="modal3Buttons">
                        <button type="submit" onClick={submitEmailChange} >Confirm</button>
                        <button onClick={toggleModalEditEmail}>Cancel</button>
                      </div>
                    </div>
                    </div>
                    <ToastContainer />
                    </motion.div>
                )}


                {modalDeleteButton && (
                  <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="modal">
                  <div onClick={toggleModalDeleteButton} className="overlay"></div>
                    <div className="modal-content modal4">
                    <div className="modal4_content_header">
                        <h1>Do you REALLY want to delete your account?</h1>
                    </div>

                    <div className="modal4Content">
                      <h3>We will miss you if you do that!</h3>
                    </div>

                  
                  <div className="modal3ButtonsWrapper">
                    <div className="modal3Buttons"> 
                        <button onClick={deleteAccount}>Delete</button>
                        <button onClick={toggleModalDeleteButton}>Cancel</button>
                    </div>
                  </div>
                    </div>
                </motion.div>
                )}
            </section>
        <PreFooter />
        <Footer />
        </>
    )
}