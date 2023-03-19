import React from 'react'
import { useRouter } from 'next/router'
import {  useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../../../firebase-config";
import Loading from "../../components/reusableComponents/Loading";
import Link from 'next/link';
import { HashLink } from 'react-router-hash-link';

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

      

  return (
    <>
    {loading ? <Loading /> : 
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
              <Link href='/#product' >
              <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}>
                Back to all products
            </motion.button>
              </Link>
        </div>
      
      </div>
    </section>
  }
    </>
  )
}

export default Id;
