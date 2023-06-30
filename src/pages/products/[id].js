import React from 'react'
import { useRouter } from 'next/router'
import {  useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../../firebase-config";
import Loading from "../../components/reusableComponents/Loading";
import Header from '@/components/reusableComponents/Header';
import { Footer } from '@/components/reusableComponents/Footer';
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress';

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
        setLoading(false)
        }
        
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

  return (
    <>
    {loading ? <Loading /> : 
    <>
    <TopScrollProgress />
      <Header />
    <section className='sectionCenter'>
      <div className="product">

        <div className="productDescription">
          <p>{productDetails.description}</p>
          <p>{productDetails.kg} Kg </p>
        </div>
        
        <div className="product-img">
          <motion.img
          whileHover={{scale:1.1}}
          whileTap={{scale:0.9}}
          src={productDetails.image} alt="productImage"></motion.img>
        </div>

        <div className="productInfo">
            <p>Works best with a thermal plant.</p>
            <h1>{productDetails.title}</h1>
            <p>{productDetails.price} {productDetails.currency}</p>
            {/* <Link href='/#product'> */}
              <motion.button
              onClick={handleClick}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}>
                Back to all products
              </motion.button>
            {/* </Link> */}
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
