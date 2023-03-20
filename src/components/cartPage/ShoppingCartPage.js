/* eslint-disable jsx-a11y/img-redundant-alt */
import { React, useContext, useEffect, useState } from 'react';
import { AiOutlineShopping } from 'react-icons/ai'
import { FaCcVisa, FaCcMastercard, FaCcApplePay } from 'react-icons/fa'
import { FirebaseAuthContext } from '../../../FirebaseAuthContext';
import { collection, deleteDoc, doc,getDoc,getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { RiShoppingCartLine } from 'react-icons/ri';
import { loadStripe } from '@stripe/stripe-js';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import emailjs from "emailjs-com"
import { toast, ToastContainer } from 'react-toastify';
import { isEmpty } from '@firebase/util';
import {AiFillCreditCard} from 'react-icons/ai'
import { FaGooglePay } from 'react-icons/fa'
import Link from 'next/link';
import Image from 'next/image';
import "leaflet/dist/leaflet.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

 export default function ShoppingCartPage() {

  const [language, setLanguage] = useState("GB");

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  const router = useRouter();

  const { user } = useContext( FirebaseAuthContext )
  
  const [ cart, setCart ] = useState([])
  const [ country, setCountry ] = useState("")
  const [ pickUp, setPickUp] = useState(false)
  const [deliverySelected, setDeliverySelected] = useState("card")
  const [store, setStore] = useState("Bucuresti")
  const [ region, setRegion ] = useState("Select region")
  const [ disabled, setDisable ] = useState("disable")
  const [ conditional, setConditional] = useState("")
  const [loading, setLoading ] = useState(false)

/// Input useStates

  const [email ,setEmail] = useState("")
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [street, setStreet] = useState('')
  const [streetNo, setStreetNo] = useState('')
  const [block, setBlock] = useState('')
  const [apartamentNo, setApartamentNo] = useState('')
  const [isCompanyChecked, setIsCompanyChecked] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [companyCui, setCompanyCui] = useState('')

  //UseState for checks

  const [notifyLastNameNumbers, setNotifyLastNameNumbers] = useState(false);
  const [notifyLastNameSpecialChar, setNotifyLastNameChar] = useState(false);
  const [notifyLastNameUppercase, setNotifyLastNameUppercase] = useState(false)

  const [notifyFirstNameNumbers, setNotifyFirstNameNumbers] = useState(false)
  const [notifyFirstNameSpecialChar, setNotifyFirstNameSpecialChar] = useState(false)
  const [notifyFirstNameUppercase, setNotifyFirstNameUppercase] = useState(false)

  const [notifyPhoneDigits , setNotifyPhoneDigits] = useState(false)
  const [notifyLetterPhone, setNotifyLetterPhone] = useState(false)
  const [notifySpecialCharPhone, setNotifySpecialCharPhone] = useState(false)

  const [ notifyStreetNumbers , setNotifyStreetNumbers] = useState(false)
  const [ notifyStreetSpecialChar, setNotifyStreetSpecialChar] = useState(false)

  const [notifyLetterBlock , setNotifyLetterBlock] = useState(false)
  const [notifySpecialCharBlock, setNotifySpecialBlock] = useState(false)

  const [notifyLetterApartament, setNotifyLetterApartament] = useState(false)
  const [notifySpecialCharApartament, setNotifySpecialApartament] = useState(false)

  const [notifySpecialCharStreetNo, setNotifySpecialStreetNo] = useState(false)
  const [notifyLetterStreetNo, setNotifyLetterStreetNo] = useState(false)


  const handleDeliveryChange = (e) =>{
    setDeliverySelected(e.target.value)
    
    if(e.target.value === "pickUp"){
      setPickUp(true)
    }else {
      setPickUp(false);
    }
  }

  const handleRegionChange = (e) => {
    setRegion(e)

    if(region.length === (!"Select Region") || "-"){
      setDisable("")
    } else {
      setDisable("disable")
    }
  }
  
  function quantityUp(item){
    if(user?.uid){

      const userDoc = doc(db, `users/${user?.uid}/cart/${item.title+item.kg}`) 
      
      const newFields = {
        quantity : item.quantity + 1,
      }
      
      updateDoc(userDoc , newFields)
    }

    if(!user?.uid){
      const clientId = sessionStorage.getItem("clientId")
      const userDoc= doc(db, `guestCarts/${clientId}/cart/${item.title+item.kg}`)

      const newFields = {
        quantity : item.quantity + 1
      }

      updateDoc(userDoc, newFields)
    }

    setInterval(() => {
      window.location.reload()
    }, 500)

  }
  
  function quantityDown(item){
    if(user?.uid){

      const userDoc = doc(db, `users/${user?.uid}/cart/${item.title+item.kg}`) 
      
      const newFields = {
        quantity : item.quantity - 1,
      }
      
      updateDoc(userDoc , newFields)

      if(item.quantity === 1){
  
        deleteDoc(userDoc)
        console.log(`Item is deleted!` )
      }
    }

    if(!user?.uid){
      const clientId = sessionStorage.getItem("clientId")
      const userDoc= doc(db, `guestCarts/${clientId}/cart/${item.title+item.kg}`)

      const newFields = {
        quantity : item.quantity - 1
      }

      updateDoc(userDoc, newFields)

      if(item.quantity === 1){
  
        deleteDoc(userDoc)
        console.log(`Item is deleted!` )
      }
    }

    setInterval(() => {
      window.location.reload()
    }, 500)
  }
  

  useEffect(() => {
    
    const getCart = async () =>{
      setLoading(true)
      if(user?.uid){
        
        
        const cartDoc = `users/${user.uid}/cart`
        const ref = collection(db, cartDoc)
        
        let data = await getDocs(ref)
        
        setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        
        setLoading(false)
      };    
    }
    getCart()
    
    if(user?.uid){
      const getDocument = async () => {
        const ref = doc(db, 'users', user.uid)
        
        let document = await getDoc(ref)
    
        return document.data()
      }
      getDocument()
      .then(data => setConditional(data))
    }
    
    
    
    if(!user?.uid){
      setLoading(true)
      const clientId = sessionStorage.getItem("clientId")
      
      const getCart = async () => {
        const cartDoc = `guestCarts/${clientId}/cart`
          const ref = collection(db, cartDoc)
    
          let data = await getDocs(ref)
    
          setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        setLoading(false);
        };

        
        getCart()
      }
      
      
    }, [user])
    
    
    function ProductCount () {
      if (totalQuantity === 1){
          return <p>{totalQuantity} product</p>
        } else {
          return <p>{totalQuantity} products</p>
        }
      }

      const totalQuantity = cart.reduce((acc,cur) => {
        return acc+ cur.quantity
      }, 0)

      const totalPrice = cart.reduce((acc,cur) => {
        return acc + cur.quantity * cur.price
      }, 0)

      
      function stripeIdss(){
        return cart.map(cart => `${cart.title} ${cart.kg}Kg (Cantitate : ${cart.quantity}) => ${cart.kg * cart.quantity} Kg de ${cart.title})
        
        `)
      }

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
      
      const checkout = () => {
        const emailValid = validateEmail(email)
        const firstNameValid = validateFirstName(firstName)
        const lastNameValid = validateLastName(lastName)
        const phoneValid = validatePhoneNumber(phoneNumber)
        const streetValid = validateStreet(street)
        const streetNoValid = validateStreetNo(streetNo)
        const blockValid = validateBlock(block)
        const apartamentNoValid = validateApartamentNo(apartamentNo)
          
        function validateEmail(registerEmail) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
            return emailRegex.test(registerEmail);
          }
          
          function validateFirstName(firstName){
          const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/
    
          if(firstName.length === 0){
              return false
            }
    
          if(firstName.match(/\d/)){
            if(!notifyFirstNameNumbers){
              toast.error("First name can't contain numbers!", {
                autoClose: 6000
              })
              setNotifyFirstNameNumbers(true);
            }
        
            return false
          } 
          
           if(specialChars.test(firstName)){
          if(!notifyFirstNameSpecialChar){
            toast.error("First name can't contain special characters!", {
              autoClose: 6000
              })
              setNotifyFirstNameSpecialChar(true)
            }
        
            return false
          }
        
          if(/[a-z]/.test(firstName.charAt(0))){
            if(!notifyFirstNameUppercase){
              toast.error("First name's first character needs to be uppercase!", {
                autoClose: 6000
              })
              setNotifyFirstNameUppercase(true)
            }
        
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
            
            if(!notifyLastNameNumbers){
              toast.error("Last name can't contain numbers!", {
                autoClose:6000
              })
              setNotifyLastNameNumbers(true)
            }
            
            return false
          } 
          
          if(specialChars.test(lastName)){
            
            if(!notifyLastNameSpecialChar){
              toast.error("Last name can't contain special characters!", {
                autoClose: 6000
              })
              setNotifyLastNameChar(true)
            }
        
            return false
          }
        
          if(/[a-z]/.test(lastName.charAt(0))){
            if(!notifyLastNameUppercase){
              toast.error("Last name's first character needs to be uppercase!", {
                autoClose: 6000
              })
              setNotifyLastNameUppercase(true)
            }
    
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
              if(!notifyPhoneDigits){
                toast.error("Phone number can't exceed 10 digits!", {
                  autoClose: 6000
                })
                setNotifyPhoneDigits(true)
              }
        
              return false
            }
    
            if(/[a-zA-Z]/.test(phoneNumber)){
              if(!notifyLetterPhone){
                toast.error("Phone number can't contain letters!", {
                  autoClose: 6000
                })
                setNotifyLetterPhone(true)
              }
              return false
            }
    
            if(specialChars.test(phoneNumber)){
            
              if(!notifySpecialCharPhone){
                toast.error("Phone number can't contain special characters! No prefix needed!", {
                  autoClose:6000
                })
                setNotifySpecialCharPhone(true)
              }
              
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
              if(!notifyStreetNumbers){
                toast.error("Street can't contain numbers! Input Street No.below.", {
                  autoClose: 6000
                })
                setNotifyStreetNumbers(true)
              }
              return false
            }
    
            if(specialChars.test(street)){
              if(!notifyStreetSpecialChar){
                toast.error("Street can't contain special characters!", {
                  autoClose:6000
                })
                setNotifyStreetSpecialChar(true)
              }
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
              if(!notifyLetterStreetNo){
                toast.error("Street No. can't contain letters!", {
                  autoClose: 6000
                })
                setNotifyLetterStreetNo(true)
              }
              return false
            }
    
            if(specialChars.test(streetNo)){
            
              if(!notifySpecialCharStreetNo){
                toast.error("Street No. can't contain special characters! No prefix needed!", {
                  autoClose:6000
                })
                setNotifySpecialStreetNo(true)
              }
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
              if(!notifyLetterBlock){
                toast.error("Phone number can't contain letters!", {
                  autoClose: 6000
                })
                setNotifyLetterBlock(true)
              }
              return false
            }
    
            if(specialChars.test(block)){
            
              if(!notifySpecialCharBlock){
                toast.error("Phone number can't contain special characters! No prefix needed!", {
                  autoClose:6000
                })
                setNotifySpecialBlock(true)
              }
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
              if(!notifyLetterApartament){
                toast.error("Phone number can't contain letters!", {
                  autoClose: 6000
                })
                setNotifyLetterApartament(true)
              }
              return false
            }
    
            if(specialChars.test(apartamentNo)){
            
              if(!notifySpecialCharApartament){
                toast.error("Phone number can't contain special characters! No prefix needed!", {
                  autoClose:6000
                })
                setNotifySpecialApartament(true)
              }
              return false
          }
          return true
          }

          if(!emailValid || !firstNameValid || !lastNameValid || !phoneValid || !streetValid || !streetNoValid || !blockValid || !apartamentNoValid || isEmpty(country) || region === "Select region" ||  (pickUp && isEmpty(selectedMarker))){
            toast.error("One or more fields are empty!", {
              autoClose: 6000
            })
            return
          }
          
          if(deliverySelected === "card"){
            redirectToCheckout()

              localStorage.setItem("email", email);
              localStorage.setItem("firstName", firstName);
              localStorage.setItem("lastName", lastName);
              localStorage.setItem("phoneNumber", phoneNumber);
              localStorage.setItem("street", street);
              localStorage.setItem("streetNo", streetNo);
              localStorage.setItem("block", block);
              localStorage.setItem("apartamentNo", apartamentNo);
              localStorage.setItem("isCompanyChecked", isCompanyChecked);
              localStorage.setItem("companyName", companyName);
              localStorage.setItem("companyCui", companyCui);
              localStorage.setItem("total", totalPrice)
              console.log(totalPrice)
      
          } else if(deliverySelected === "ramburs" || "pickUp") {

            emailjs.send('service_eyuz8pg' , 'template_xeem2dd', {
              subject : `Comanda de la ${email}`,
              metoda : `Metoda de livrare este : ${deliverySelected === "ramburs" ? "Ramburs" : `Ridicare din magazinul din <b>${selectedMarker}</b>.`}`,

              company: `${isCompanyChecked ? `Nume Firma: ${companyName
              }, CUI: ${companyCui}.` : `Persoana Fizica.` }`,

              name : `<b>${firstName} ${lastName} ( ${email} )</b>`,
              phone: `<b>${phoneNumber}</b>`,
              street : `<b>${street}</b>`, 
              streetNo: `<b>${streetNo}</b>`,
              bloc : `<b>${block}</b>`,
              apartNo : `<b>${apartamentNo}</b>`,
              
              message : `Comanda contine :
              ${stripeIdss()}`,
              
              totalPrice : `Pretul total este de <b>${totalPrice} lei</b>.`,
            }, 'crU6K8bQnftB81z-j' )
            
            toast.success(
            language === "FR" ? "Merci pour votre commande ! Vous serez bientôt contacté(e) par notre équipe !" :
            language === "RO" ? "Multumim pentru comanda! Veti fi contactat in curand de catre echipa noastra!" :
            language === "DE" ? "Vielen Dank für Ihre Bestellung! Sie werden bald von unserem Team kontaktiert!" :
            language === "IT" ? "Grazie per l'ordine! Sarete presto contattati dal nostro team!" :
            "Thanks for the order! You will soon be contacted by our team!", {
              autoClose: 4000
            })

        
            
            setTimeout(() => {
              deleteCartUponSuccess();
              router.push('/')

          }, 5000)

          } 

        }


        const handleEmailChange = e => {
          setEmail(e.target.value)
        }

        const handleLastNameChange = (e) => {
          const input = e.target.value
          setLastName(input)
        }

        const handleFirstNameChange = (e) => {
          
          if(user?.uid){
            setFirstName(conditional.firstName)
          }

          const input = e.target.value
          setFirstName(input)

        }

        const handlePhoneNumberChange = (e) => {
          const input = e.target.value
          setPhoneNumber(input)

          if(user?.uid){
            setPhoneNumber(conditional.phoneNumber)
          }
        }

        const handleStreetChange = (e) => {
          const input = e.target.value
          setStreet(input)
          if(user?.uid){
            setStreet(conditional.address)
          }
        }

        const handleStreetNoChange = (e) => {
          const input = e.target.value
          setStreetNo(input)
        }

        const handleBlockChange = (e) => {
          const input = e.target.value
          setBlock(input)
        }

        const handleApartamentNo = (e) => {
          const input = e.target.value
          setApartamentNo(input)
        }

        const handleCompanyNameChange = (e) => {
          if(isCompanyChecked){
            setCompanyName(e.target.value)
          }
        }

        const handleCompanyCuiChange = (e) => {
          if(isCompanyChecked){
            setCompanyCui(e.target.value)
          }
        }
      
        
        let stripePromise;
        
        const getStripe = () => {
        if(!stripePromise){
          stripePromise = loadStripe("pk_test_51MQo3GLhCgTZCrVVShrOGDphb9M7MGq9YTOCW90JE5cVtrYsExpY49wClOSYqEn4Ezv9tGcuKIFtbBpSCIF1iDPT00wEyjkOIV")
        }
        return stripePromise
      }

      const stripeIds = cart.map(item => item.stripeId)
      const itemQuantity = cart.map(item => item.quantity)

      const items = []
      for(let i= 0; i < cart.length; i++){
        items.push({
          price : stripeIds[i],
          quantity : itemQuantity[i]
        })
      }

      const checkoutOptions = {
        lineItems: items,
        mode: "payment",
        customerEmail: email,
        successUrl : `${typeof window !== 'undefined' && window.location.origin}/success`,
        cancelUrl : `${typeof window !== 'undefined' && window.location.origin}/cancel`,
        billingAddressCollection : 'required',
        shippingAddressCollection: { allowedCountries : ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ'] }
      }

      const [loadingStripe, setLoadingStripe] = useState(false)

      const redirectToCheckout = async () => {
        setLoadingStripe(true)
        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout(checkoutOptions)
        setLoadingStripe(false)
        if(!error){
          try {
            emailjs.send('service_eyuz8pg', 'template_xeem2dd', {
              subject: `Comanda de la ${email} (${firstName} ${lastName})`,
              metoda: `${firstName} ${lastName} a facut o plata in valoare de 3 RON`,
              
              name : `Nume : ${firstName} ${lastName} ( ${email} )`,
              phone: `Telefon : <b>${phoneNumber}</b>`,
              street : `Strada :<b>${street}</b>`,
              streetNo: `Nr. Strazii: <b>${streetNo}</b>`,
            bloc : `Bloc : <b>${block}</b>`,
            apartNo : `Apartament : <b>${apartamentNo}</b>`,
          }, 'crU6K8bQnftB81z-j')
        } catch (err) {
          console.error(err)
        }
        } 
      }

      function removeItemFromCart(item){
        if(user?.uid){
          const userDoc = doc(db, `users/${user?.uid}/cart/${item.title+item.kg}`) 
          
          deleteDoc(userDoc)
        }
        
        if(!user?.uid){
          const clientId = sessionStorage.getItem("clientId")
          
          const userDoc= doc(db, `guestCarts/${clientId}/cart/${item.title+item.kg}`)
          
          deleteDoc(userDoc)
        }

        setInterval(() => {
          window.location.reload();
        }, 1000)
      }


        const deleteCart = async () => {
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
          
            setInterval(() => {
            window.location.reload()
          }, 2000)
          
        }

      useEffect(() => {
        if(user?.uid){
          setEmail(user.email)
          setFirstName(conditional.firstName)
          setLastName(conditional.lastName)
          setPhoneNumber(conditional.phoneNumber)
          setStreet(conditional.street)
          setStreetNo(conditional.streetNo)
          setBlock(conditional.block)
          setApartamentNo(conditional.apartNo)
        }

        const emailFromLocal = localStorage.getItem('email')
        const firstNameFromLocal = localStorage.getItem('firstName')
        const lastNameFromLocal = localStorage.getItem('lastName')
        const phoneFromLocal = localStorage.getItem('phoneNumber')
        const streetFromLocal = localStorage.getItem('street')
        const streetNoFromLocal = localStorage.getItem('streetNo')
        const blockFromLocal = localStorage.getItem('block')
        const apartamentNoFromLocal = localStorage.getItem('apartamentNo')

        if(emailFromLocal && emailFromLocal.length > 0){
          setEmail(emailFromLocal)
        }

        if(firstNameFromLocal && firstNameFromLocal.length > 0){
          setFirstName(firstNameFromLocal)
        }

        if(lastNameFromLocal && lastNameFromLocal.length > 0){
          setLastName(lastNameFromLocal)
        }

        if(phoneFromLocal && phoneFromLocal.length > 0){
          setPhoneNumber(phoneFromLocal)
        }

        if(streetFromLocal && streetFromLocal.length > 0){
          setStreet(streetFromLocal)
        }

        if(streetNoFromLocal && streetNoFromLocal.length > 0){
          setStreetNo(streetNoFromLocal)
        }

        if(blockFromLocal && blockFromLocal.length > 0){
          setBlock(blockFromLocal)
        }

        if(apartamentNoFromLocal && apartamentNoFromLocal.length > 0){
          setApartamentNo(apartamentNoFromLocal)
        }

      }, [conditional, user])

      function onChangeQ(e){
        console.log(e.target.value)
        return Number(e.target.value)
      }


      function quantityChange(e, item){

        if(user?.uid){
          const userDoc = doc(db, `users/${user.uid}/cart/${item.title + item.kg}`)
          
          const newFields = {
              quantity : onChangeQ(e)
            }

          updateDoc(userDoc, newFields)
          
          if(onChangeQ(e) === 0){
            if(e.target.value === "" || e.target.value === null){
              return;
            }else {
              setTimeout(() => {
                const userDoc = doc(db, `users/${user?.uid}/cart/${item.title+item.kg}`) 
                
                deleteDoc(userDoc)

                window.location.reload();
              }, 1000)
            }
          }

          if(onChangeQ(e) > 0){
            toast.warn("Cart is being updated!", {
              autoClose: 500
            })
        
            setInterval(() => {
              window.location.reload();
            }, 2000 )
          }
        }
        
        if(!user?.uid){

            const clientId = sessionStorage.getItem("clientId")
            
            const guestDoc = doc(db, `guestCarts/${clientId}/cart/${item.title+item.kg}`)
            
            const newFields = {
              quantity : onChangeQ(e)
            }

            if(onChangeQ(e) > 0 ){
                toast.warn("Cart is being updated!", {
                  autoClose: 500
                })
            
                setInterval(() => {
                  window.location.reload();
                }, 2000 )

            }

            updateDoc(guestDoc, newFields)
          
          if(onChangeQ(e) === 0){
            if(e.target.value === "" || e.target.value === null){
              return
            } else {
              setTimeout(() => {

                const clientId = sessionStorage.getItem("clientId") 
                
                const userDoc= doc(db, `guestCarts/${clientId}/cart/${item.title+item.kg}`)
                
                deleteDoc(userDoc)

                window.location.reload();
              }, 1000)
            }
            
          }
        }
        
      }
    
      const [center, setCenter] = useState([45.9442858,25.0094303])
      const [zoom , setZoom] = useState(6)
    
      const [selectedMarker, setSelectedMarker] = useState('');
    
      const handleClickBucharest = () => {
        setSelectedMarker('Bucuresti')
        setCenter([locations[0].latitude, locations[0].longitude])
        setZoom(17)
      }
    
      const handleClickArges = () => {
        setSelectedMarker('Arges');
        setZoom(16)
        setCenter({lat: locations[1].latitude, lng: locations[1].longitude})
      }

      const locations = [
        {
          name: 'Bucharest',
          address: 'Bucharest, Romania',
          latitude: 44.47639,
          longitude: 26.15962
        },
        {
          name: 'Arges',
          address: 'Arges, Romania',
          latitude: 44.88932095525005,
          longitude: 25.137240790315126
        }
      ];
    
  return (
    <div >
    {loading === false && 
     cart.length === 0 ?
     <div className='emptyCartTextWrapper'>
     <div className='emptyCartText'>
       <div>
     <h1>{language === "FR" ? "Votre panier est vide !" 
     : language === "RO" ? "Cosul dvs. este gol!" 
     : language === "DE" ? "Ihr Warenkorb ist leer!" 
     : language === "IT" ? "Il tuo carrello è vuoto!" 
     : "Your cart is empty!"}</h1>
       </div>

       <div>
     <p> <RiShoppingCartLine /> </p>
       </div>

     </div>

     <div>
      <Link className='cartBackToProduct' href="/" replace={true}>
        {language === "FR" ? "Retour aux produits." :
        language === "RO" ? "Înapoi la produse." :
        language === "DE" ? "Zurück zu den Produkten." :
        language === "IT" ? "Torna ai prodotti." :
        "Back to products."}
      </Link>
     </div>

     </div> 
     : loading ? <div>Loading...</div> : 
     <>
     <div className='pageHeader'>
   <h1>{language === "FR" ? "Votre panier" :
  language === "RO" ? "Cosul dvs." :
  language === "DE" ? "Ihr Warenkorb" :
  language === "IT" ? "Il tuo carrello" :
  "Your cart"}</h1>
   <AiOutlineShopping />
   </div>
   <ToastContainer />
   <section className='wrapper' >
   <section className='cartPageLeftSection'>
   <h1>
    {language === "FR" ? "1. VÉRIFIER VOTRE COMMANDE" :
    language === "RO" ? "1. REVIZUITI COMANDA" :
    language === "DE" ? "1. ÜBERPRÜFEN SIE IHRE BESTELLUNG" :
    language === "IT" ? "1. RIVEDI IL TUO ORDINE" :
    "1. REVIEW YOUR ORDER"}
  </h1>

   <h3> 
    {language === "FR" ? "Veuillez vérifier que vous avez la bonne quantité pour chaque article afin d'éviter toute confusion lors du paiement. Merci!" :
    language === "RO" ? "Va rugam sa verificati ca aveti cantitatea corecta pentru fiecare articol pentru a evita confuziile la finalizarea comenzii. Mulțumim!" :
    language === "DE" ? "Bitte überprüfen Sie, ob Sie die richtige Menge an jedem Artikel haben, um Verwirrungen an der Kasse zu vermeiden. Danke!" :
    language === "IT" ? "Si prega di controllare di avere la quantità corretta di ciascun articolo per evitare confusione al momento del checkout, Grazie!" :
    "Please check that you have the right quantity of every single item to avoid confusions at checkout, Thanks!"}
  </h3>


   {cart.map((item) => {
     return(
       <section key={item.id} className='cartProductShowFlex'>
           <div>
             <Image src={item.image} width={150} height={150} alt="product image" />
           </div>

         <div className='row'>
           <div className='column'>
             <p className='columnProductTitle'>{item.title}</p>
             <p>{item.kg} Kg</p>
           </div>

           <div className='column'>
             <p>
              {language === "FR" ? "Chaque" :
              language === "RO" ? "Fiecare" :
              language === "DE" ? "Jeder" :
              language === "IT" ? "Ogni" :
              "Each"}
            </p>
             {item.price} {item.currency}
           </div>

           <div className='column quantityFlex'>
             <p>
              {language === "FR" ? "Quantité" :
              language === "RO" ? "Cantitate" :
              language === "DE" ? "Menge" :
              language === "IT" ? "Quantità" :
              "Quantity"}
            </p>

             <div className='quantityColumn'>
              
              <button type='button' onClick={() => quantityDown(item)}>-</button>
              <input type="text" pattern='\d*' defaultValue={item.quantity} onChange={(e) => quantityChange(e, item)} />
              <button type='button' onClick={() => quantityUp(item)}>+</button>
              
             </div>
           
           </div>

           <div className='column'>
             <p>
              {language === "FR" ? "Total" :
              language === "RO" ? "Total" :
              language === "DE" ? "Summe" :
              language === "IT" ? "Totale" :
              "Total"}
            </p>
             {item.quantity * item.price} {item.currency}
           </div>

           <button className='removeBtn'  onClick={() => removeItemFromCart(item)}>
            {language === "FR" ? "Retirer" :
              language === "RO" ? "Elimina" :
              language === "DE" ? "Entfernen" :
              language === "IT" ? "Rimuovere" :
              "Remove"}

           </button>

         </div>
       </section>
     )
       })}

   <div className='productCartFooter'>
   <button className="emptyCartButton" onClick={deleteCart}>
   {language === "FR" ? "Panier vide" :
 language === "RO" ? "Goliti cosul" :
 language === "DE" ? "Warenkorb leer" :
 language === "IT" ? "Carrello vuoto" :
 "Empty Cart"}

   </button>
     <ProductCount />
     <p>Total: {totalPrice} RON</p>
   </div>
   </section>
   <section className='deliveryAddress'>
   <div className='deliveryAddress_wrapper'>
   <div className='deliveryAddress_header'>
     <h1>2. {language === "FR" ? "DÉTAILS DU CLIENT" :
  language === "RO" ? "DETALII CLIENT" :
  language === "DE" ? "KUNDENANGABEN" :
  language === "IT" ? "DETTAGLI CLIENTE" :
  "CLIENT DETAILS"}
  </h1>
     <h3>{language === "FR" ? "Veuillez vérifier que toutes les informations sont valides et correctes, Merci !" :
language === "RO" ? "Va rugam sa verificati ca toate informatiile sunt valide si corecte, Multumim!" :
language === "DE" ? "Bitte überprüfen Sie, ob alle Informationen gültig und korrekt sind. Danke!" :
language === "IT" ? "Per favore, controlla che tutte le informazioni siano valide e corrette, Grazie!" :
"Please check that all the informations are valid and correct, Thanks!"}
</h3>
     <h5>{language === "FR" ? "Tous les champs doivent être remplis!" :
  language === "RO" ? "Campurile trebuie completate." :
  language === "DE" ? "Alle Felder müssen ausgefüllt werden!" :
  language === "IT" ? "Tutti i campi devono essere compilati!" :
  "All fields need to be completed!"}</h5>
   </div>

   <ToastContainer />

   <div className="deliveryAddress_inputs">
     <div className='deliveryAddress_inputs__input' >
       <input type="email" required="required" defaultValue={email} onChange={handleEmailChange} ></input>
       <span>Email Address</span>
     </div>

     <div className='deliveryAddress_inputs__input input2' >
       <div>
         <input type="text" defaultValue={firstName} onChange={handleFirstNameChange} required="required" ></input>
         <span>{language === 'FR' ? 'Prénom' :
                                language === 'RO' ? 'Prenume' :
                                language === 'DE' ? 'Vorname' :
                                language === 'IT' ? 'Nome' :
                                'First name'}</span>
       </div>

       <div className='lastNameInput'>
         <input type="text" defaultValue={lastName} onChange={(e) => handleLastNameChange(e)} required="required" ></input>
         <span>{language === 'FR' ? 'Famille Nom' :
                                language === 'RO' ? 'Nume' :
                                language === 'DE' ? 'Nachname' :
                                language === 'IT' ? 'Cognome' :
                                'Last name'}</span>
       </div>
     </div>

     <div className='deliveryAddress_inputs__input' >
       <input type="number" defaultValue={phoneNumber} onChange={handlePhoneNumberChange} required="required"></input>
       <span>
        {language === 'FR' ? 'Téléphone' :
        language === 'RO' ? 'Numar de telefon' :
        language === 'DE' ? 'Telefonnummer' :
        language === 'IT' ? 'Telefono' :
        'Phone number'}</span>
     </div>
     
     <div className='deliveryAddress_inputs__input' >
       <input type="text" defaultValue={street} onChange={handleStreetChange} required="required"></input>
       <span>
        {language === 'FR' ? 'Rue' :
        language === 'RO' ? 'Strada' :
        language === 'DE' ? 'Straße' :
        language === 'IT' ? 'Via' :
        'Street'}</span>
     </div>


     <div className='deliveryAddress_inputs__input towninput' >

       <div className='lastNameInput'>
         <input type="text" defaultValue={streetNo} onChange={handleStreetNoChange} required="required"></input>
         <span>{language === 'FR' ? 'Rue No.' :
                                language === 'RO' ? 'Nr. Strada' :
                                language === 'DE' ? 'Hausnummer' :
                                language === 'IT' ? 'Via No.' :
                                'Street No.'}</span>
       </div>

       <div className='lastNameInput'>
         <input type="text" defaultValue={block} onChange={handleBlockChange} required="required"></input>
         <span>{language === 'FR' ? 'Bloc' :
                                language === 'RO' ? 'Bloc' :
                                language === 'DE' ? 'Block' :
                                language === 'IT' ? 'Blocco' :
                                'Block'}</span>
       </div>

     </div>
     
     <div className='deliveryAddress_inputs__input'>
         <input type="text" defaultValue ={apartamentNo} onChange={handleApartamentNo} required="required"></input>
         <span>{language === 'FR' ? 'Appartement No.' :
                                language === 'RO' ? 'Numarul apartamentului' :
                                language === 'DE' ? 'Wohnungsnummer' :
                                language === 'IT' ? 'Appartamento N.' :
                                'Apartament No.'}</span>
     </div>

       <div className='companyCheckbox'>
         <input type="checkbox" id='Company' name='company' checked={isCompanyChecked} onChange={() => setIsCompanyChecked(!isCompanyChecked)}></input>
         <label htmlFor="Company" >{language === 'Romania' ? 'Companie ?' : 'Company ?'}</label>
       </div>

     {isCompanyChecked && (
       
       <div className='deliveryAddress_inputs__input towninput' >

       <div className='lastNameInput'>
         <input type="text" defaultValue={companyName} onChange={handleCompanyNameChange} required="required"></input>
        <span>{language === "FR" ? 'Nom de l\'entreprise' :
                language === "RO" ? 'Numele companiei' :
                language === "DE" ? 'Firmenname' :
                language === "IT" ? 'Nome della società' :
                'Company Name'}
        </span>
       </div>

       <div className='lastNameInput'>
         <input type="text" defaultValue={companyCui} onChange={handleCompanyCuiChange} required="required"></input>
         <span>{language === 'RO' ? 'CUI' : 'ID'}</span>
       </div>

       </div>
         )}
   </div>
   </div>

     <section className='checkoutTab'>
       <div className='checkoutTab_header'>
         <h1>3. {language === 'RO' ? 'CUMPARA' : 'CHECKOUT'}</h1>
         <h3>{language === 'RO' ? 'Sumar comanda' :
              language === 'FR' ? 'Récapitulatif de commande' :
              language === 'DE' ? 'Bestellübersicht' :
              language === 'IT' ? 'Riepilogo ordine' :
              'Order summary'}
         </h3>
       </div>

       <section className='doamneAjuta'>
       {cart.map((item) => {
         return (
           <section key={item.id} className='productCheckoutPage'>
               <div className='imageQuantity'>
                 <Image src={item.image} alt="product image" width={100} height={100}/>
                 <p>{item.quantity}</p>
               </div>
             
               <p className='productCheckoutPage_Title'>{item.title}</p>
               <p>{item.quantity * item.price} {item.currency}</p>
             </section>
             )
           })}
           <div className='productCheckoutPage_footer'>
               <h1>
               {language === "FR" ? "Total" :
              language === "RO" ? "Total" :
              language === "DE" ? "Summe" :
              language === "IT" ? "Totale" :
              "Total"}
               </h1>
             <div className='totalQuantityPrice'>
               <p>{ language === 'RO' ? 'Produse:' :
                     language === 'FR' ? 'Produits :' :
                     language === 'DE' ? 'Produkte:' :
                     language === 'IT' ? 'Prodotti :' :
                     'Products :'} <span>{totalQuantity}</span>  </p>
               <p>{language === 'RO' ? 'Subtotal:' :
                  language === 'FR' ? 'Sous-total :' :
                  language === 'DE' ? 'Zwischensumme:' :
                  language === 'GB' ? 'Sub-total :' :
                  language === 'IT' ? 'Subtotale :' :
                  'Sub-total :'} <span>{totalPrice}</span> RON</p>
             </div>

             <div className='deliveryOptions'>
               <CountryDropdown className="countryDrop" value={country}
              defaultOptionLabel = {language === "RO" ? "Alege tara" :
                                    language === "FR" ? 'Choisissez le pays' : 
                                    language === 'IT' ? 'Seleziona il paese' :
                                  language === "DE" ? 'Land auswählen' :
                                  "Select Country"}
              onChange={(e) => setCountry(e)}
/>
               <RegionDropdown country={country}
               value = {region}
               onChange={handleRegionChange}
               className="regionDrop"
               defaultOptionLabel = {language === "RO" ? "Alege orasul" :
               language === "FR" ? 'Choisissez une région' : 
               language === 'IT' ? 'Seleziona regione' :
             language === "DE" ? 'Region wählen' :
             "Select Region"}/>
               <label htmlFor="delivery">
               {language === 'FR' ? 'Méthode de paiement' :
                language === 'RO' ? 'Metoda de plată' :
                language === 'DE' ? 'Zahlungsmethode' :
                language === 'IT' ? 'Metodo di pagamento' :
                'Pay Method:'}
               </label>
               
               {country === "Romania" && (
                 <select disabled={disabled} id='delivery' onChange={handleDeliveryChange} className="regionDrop" value={deliverySelected}>
                 <option value="card">{
                  language === 'RO' ? 'Card de credit' :
                  language === 'FR' ? 'Carte de crédit' :
                  language === 'DE' ? 'Kreditkarte' :
                  language === 'IT' ? 'Carta di credito:' : "Credit Card"}
                 </option>
                 <option value="ramburs">
                  {language === 'FR' ? 'Paiement à la livraison.'
                : language === 'RO' ? 'Plata la livrare.'
                : language === 'DE' ? 'Zahlung bei Lieferung.'
                : language === 'IT' ? 'Pagamento alla consegna.'
                : 'Cash on delivery:'}
                  </option>
                 <option value="pickUp">{language === 'FR' ? 'Retrait en magasin disponible.' :
language === 'RO' ? 'Ridicare din unul din magazinele noastre.' :
language === 'DE' ? 'Abholung in einem unserer Geschäfte.' :
language === 'IT' ? 'Ritiro presso uno dei nostri negozi' :
'Pick up from one of our stores.'}</option>
               </select>
               )}

               {!(country === "Romania") && (
                 <select disabled={disabled} id='delivery'>
                 <option value="card">
                 {
                  language === 'RO' ? 'Card de credit' :
                  language === 'FR' ? 'Carte de crédit' :
                  language === 'DE' ? 'Kreditkarte' :
                  language === 'IT' ? 'Carta di credito:' : "Credit Card"}
                 </option>
               </select>
               )}

               {pickUp && (
                <>
                <div style={{ width: '100%', height: '300px' }}>
                  <MapContainer style={{width: '100%', height: '100%'}} center={center} zoom={zoom} key={center}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker  position={[locations[0].latitude, locations[0].longitude]}>
                      <Popup >
                        Bucuresti
                      </Popup>
                    </Marker>
                    <Marker  position={[locations[1].latitude, locations[1].longitude]}>
                      <Popup >
                        Arges
                      </Popup>
                    </Marker>
                  </MapContainer>
                  </div>
                 
                   <div className='googleMapDiv'>
                      <div className='selectionMapDiv'>
                        <div>
                          <p>Bucuresti</p>
                          <p>Strada. Hispania Nr.36, 022633</p>
                        </div>

                      <div className='selectionMapDiv__buttons'>
                        <a href={`https://goo.gl/maps/MemUAUBPwZshs4oNA`} rel='noreferrer noopener' target='_blank' >
                          {
                          language === 'RO' ? 'Locatie' :
                          language === 'FR' ? 'Emplacement' :
                          language === 'DE' ? 'Standort' :
                          language === 'IT' ? 'Posizione' : 'Location'
                          }
                        </a>
                        
                        <button onClick={handleClickBucharest}>
                          {language === 'RO' ? 'Selecteaza' :
                          language === 'FR' ? 'Sélectionner' :
                          language === 'DE' ? 'Auswählen' :
                          language === 'IT' ? 'Seleziona' : 'Select'}
                        </button>
                      </div>
                      </div>

                      <div className='selectionMapDiv'>
                        <div>
                          <p>Arges</p>
                          <p>DC97A, Bogati, 115502</p>
                        </div>

                      <div className='selectionMapDiv__buttons'>
                        <a href='https://goo.gl/maps/gq9XcA8aSvxiC6hB8' target='_blank' rel='noopener noreferrer'>
                          {
                            language === 'RO' ? 'Locatie' :
                            language === 'FR' ? 'Emplacement' :
                          language === 'DE' ? 'Standort' :
                          language === 'IT' ? 'Posizione' : 'Location'
                          }
                        </a>
                        <button onClick={handleClickArges}>
                          {language === 'RO' ? 'Selecteaza' :
                          language === 'FR' ? 'Sélectionner' :
                          language === 'DE' ? 'Auswählen' :
                          language === 'IT' ? 'Seleziona' : 'Select'}
                        </button>
                      </div>
                      
                      </div>
                      </div>
                    
                    </>
              )} 

               <div className='deliveryFooter'> 
                <p>{language === 'FR' ? 'NOUS ACCEPTONS :' :
                    language === 'RO' ? 'ACCEPTAM :' :
                    language === 'DE' ? 'WIR AKZEPTIEREN :' :
                    language === 'IT' ? 'ACCETTIAMO :' :
                    'WE ACCEPT :'}
                </p>
                 <div className='react-icons'>
                 <FaCcApplePay /> <FaGooglePay /> <AiFillCreditCard /> <FaCcMastercard /> <FaCcVisa />
                 </div>
               
               <button className='checkoutButton' onClick={checkout}>
                {loadingStripe ? 
                (language === 'Romania' ? 'Se încarcă...' :
                language === 'France' ? 'Chargement...' :
                language === 'Germany' ? 'Wird geladen...' :
                language === 'Italy' ? 'Caricamento...' :
                'Loading...') 
                : 
                (language === 'Romania' ? 'Finalizează comanda' :
                language === 'France' ? 'Passer à la caisse' :
                language === 'Germany' ? 'Zur Kasse' :
                language === 'Italy' ? 'Checkout' :
                'Checkout')
                }
              </button>
               
               </div>
             </div>
           </div>
             </section>    
       </section>
   </section>
   </section>
   </>

    }
  </div>
    )
}