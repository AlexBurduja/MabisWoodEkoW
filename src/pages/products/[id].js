  import React, { useContext } from 'react'
  import { useRouter } from 'next/router'
  import {  useEffect, useState } from "react";
  import { AnimatePresence, motion } from "framer-motion";
  import { collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
  import { analytics, db } from "../../../firebase-config";
  import Loading from "../../components/reusableComponents/Loading";
  import Header from '@/components/reusableComponents/Header';
  import { Footer } from '@/components/reusableComponents/Footer';
  import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress';
  import { IoIosCall } from 'react-icons/io';
  import { BsPinMapFill, BsWhatsapp } from 'react-icons/bs';
  import { FiMail } from 'react-icons/fi';
  import Link from 'next/link';
import { FirebaseAuthContext } from '../../../FirebaseAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { getAnalytics, logEvent } from 'firebase/analytics';

  function Id() {

      const {user} = useContext(FirebaseAuthContext)
      const router = useRouter()
      const { id } = router.query
      const [productDetails, setProductDetails] = useState({})
      const [loading, setLoading] = useState(true)

      let analytics;

      if (typeof window !== 'undefined') {
        analytics = getAnalytics();
      }

      useEffect(() => {

        const fetchProductDetails = async () => {
          try {
            const ref = doc(db, `/products/${id}`);
            const data = await getDoc(ref);
            if (data.exists()) {
              setProductDetails(data.data());
            } else {
              router.push('/')
            }
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false);
          }
        };
    
        if (id) {
          setLoading(true);
          fetchProductDetails();
        }
        }, [id])

    const scrollToProduct = () => {
      const productElement = document.getElementById('product');
      if (productElement) {
        productElement.scrollIntoView();
      }
    };

    console.log(productDetails)

    function handleClick(e) {
      e.preventDefault();
      router.push('/#product');
      setTimeout(() => {
        const productElement = document.getElementById('product');
        if (productElement) {
          productElement.scrollIntoView();
        }
      }, 300);
    }

    useEffect(() => {
      const hash = window.location.hash;
      if (hash === '#product') {
        scrollToProduct();
      }
    }, []);

    const [modal, setModal] = useState(false)

    function handleModal() {
      setModal(!modal)

      modal === false ? document.body.classList.add('modal-open') : document.body.classList.remove('modal-open')
    }

    const phoneNumber = '+40721648424';
    const whatsappLink = `https://wa.me/${phoneNumber}`;

    const [counter, setCounter] = useState(1)

    const addToCart = async () => {

      let updatedValue;


    if(user?.uid) {
    const cartDoc = `users/${user.uid}/cart`

    const newFields = {
      title : productDetails.title,
      quantity: 1,
      price : productDetails.price,
      currency: productDetails.currency,
      kg: productDetails.kg,
      stripeId : productDetails.stripeId,
      image : productDetails.image
    }

    const existingDoc = {
      quantity : counter
    }
    
    const docRef = doc(db, cartDoc, productDetails.title+productDetails.kg);
    const docSnap = await getDoc(docRef)
    const notifyAdd = () => toast.success(`${productDetails.title} added in cart!`, {
      autoClose: 2000
    })
    
    if(docSnap.exists()){
      console.log('clicked')
      setCounter(counter + 1)
      updateDoc(doc(db,cartDoc,productDetails.title+productDetails.kg), existingDoc)
      notifyAdd();
      updatedValue = counter * productDetails.price
       
    } else {
      toast.success(`${productDetails.title} added in cart!`, {
        autoClose: 2000
      })
        setDoc(doc(db, cartDoc, productDetails.title+productDetails.kg), newFields)
      
      updatedValue = counter / 2 * productDetails.price
    }
  
    console.log(docSnap.exists())
  }

  if(!user?.uid){
    const clientId = sessionStorage.getItem("clientId")
    
    const cartDoc = `guestCarts/${clientId}/cart`

    const newFields = {
      title : productDetails.title,
      quantity: 1,
      price : productDetails.price,
      currency: productDetails.currency,
      kg: productDetails.kg,
      stripeId : productDetails.stripeId,
      image : productDetails.image
    }

    const existingDoc = {
      quantity : counter
    }

    const docRef = doc(db,cartDoc,productDetails.title+productDetails.kg);
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      setCounter(counter + 1)
      updateDoc(doc(db,cartDoc,productDetails.title+productDetails.kg), existingDoc)
      toast.success(`Now having ${counter} ${productDetails.title} in your cart!`, {
        autoClose: 2000})
      updatedValue = counter * productDetails.price
    } else {
      setDoc(doc(db, cartDoc, productDetails.title+productDetails.kg), newFields)
      toast.success(`${productDetails.title} added in cart!`, {
        autoClose: 2000
      })

      updatedValue = counter / 2 * productDetails.price
    }

  }

  logEvent(analytics, 'add_to_cart', {
    items: [{
      item_name: productDetails.title,
      item_id: productDetails.stripeId,
      quantity: counter,
      price: productDetails.price
    }],
    currency: 'RON',
    value: updatedValue
  });
  
}

    return (
      <>
      {loading ? <Loading /> : 
      <>
      <TopScrollProgress />
        <Header />
      <section className='sectionCenter'>
        <ToastContainer />
        
        <h1 className='productTitle'>{productDetails.title}</h1>
        

        <div className="product">

          <div className="productDescription">
            <p>{productDetails.kg} Kg </p>
            <motion.button
                  className='quantityButton'
                  onClick={handleModal}
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}>
                  Negociaza-ti cantitatea.
            </motion.button>

          </div>
            <AnimatePresence >
        {modal && (
          <motion.div 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.3}}
          className='modalSingleProduct'
          >
            <div className='modalBackground' onClick={handleModal}></div>
              <div className='modal-continut'>
                <div>
                  <h1>Contacteaza echipa Mabis Wood Eko alegand o optiune de mai jos sau prin completarea formularului din zona <Link href='/contact'>Contact.</Link></h1>
                </div>

                <div>
                <div className="productPageModal">
                <p><span> <IoIosCall /> </span> <a href="tel:+40721648424" target='_blank'>+40721648424</a> </p>
                <p><span><BsWhatsapp /> </span> <a href={whatsappLink} target='_blank'>+40721648424</a> </p>
                <p><span> <FiMail /> </span> <a href="mailto:dan@mabiswood.ro" target='_blank'>dan@mabiswood.ro</a> </p>
                <p><span> <BsPinMapFill /> </span> <a href="https://goo.gl/maps/NrauAUNSKYqhu74E8" target='_blank'> Sat. Bogati, Comuna. Bogati, Strada. Alunis, Nr. 190B, Judetul. Arges</a></p>
              </div>
                </div>
              </div>
          </motion.div>
        )}
        </AnimatePresence>
          
          <div className="product-img">
            <motion.img
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
            src={productDetails.image} alt="productImage"></motion.img>
          </div>

          <div className="productInfo">
              <p>Works best with a thermal plant.</p>
              <p>{productDetails.price} {productDetails.currency}</p>
                <motion.button
                onClick={handleClick}
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}>
                  Back to all products
                </motion.button>
          </div>
        
        </div>

      <div className='productDescriptionTextWrapper'>
        {productDetails && 
        <button onClick={addToCart}>Add to cart </button>
        }
        <p className='productDescriptionText'>{productDetails.description}</p>
      </div>

      </section>
      <Footer />
      </>
    }
      </>
    )
  }

  export default Id;
