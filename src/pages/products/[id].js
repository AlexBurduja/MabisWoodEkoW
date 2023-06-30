import React from 'react'
import { useRouter } from 'next/router'
import {  useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../../firebase-config";
import Loading from "../../components/reusableComponents/Loading";
import Header from '@/components/reusableComponents/Header';
import { Footer } from '@/components/reusableComponents/Footer';
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress';
import { IoIosCall } from 'react-icons/io';
import { BsPinMapFill, BsWhatsapp } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import Link from 'next/link';

function Id() {

    const router = useRouter()
    const { id } = router.query
    const [productDetails, setproductDetails] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {

      const ref = doc(db, `/products/${id}`)
      
        const getProduct = async () => {
          const data = await getDoc(ref)
      
        setproductDetails(data.data())
        }
        
        setLoading(false)
        getProduct();
      }, [id])

  const scrollToProduct = () => {
    const productElement = document.getElementById('product');
    if (productElement) {
      productElement.scrollIntoView();
    }
  };

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

  return (
    <>
    {loading ? <Loading /> : 
    <>
    <section className='sectionCenter'>
    <TopScrollProgress />
      <Header />
      
      <h1 className='productTitle'>{productDetails.title}</h1>
      

      <div className="product">

        <div className="productDescription">
          <p>{productDetails.description}</p>
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
        className='modal'
        >
          <div className='modalOverlay' onClick={handleModal}></div>
            <div className='modal-content modal1 '>
              <div>
                <h1>Contacteaza echipa Mabis Wood Eko alegand o optiune de mai jos sau prin completarea formularului din zona <Link href='/contact'>Contact.</Link></h1>
              </div>

              <div>
              <div className="productPageModal">
              <p><span> <IoIosCall /> </span> <a href="tel:+40721648424">+40721648424</a> </p>
              <p><span><BsWhatsapp /> </span> <a href={whatsappLink}>+40721648424</a> </p>
              <p><span> <FiMail /> </span> <a href="mailto:dan@mabiswood.ro">dan@mabiswood.ro</a> </p>
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
    </section>
    <Footer />
    </>
  }
    </>
  )
}

export default Id;
