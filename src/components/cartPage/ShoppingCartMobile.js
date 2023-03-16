import { RiShoppingCartLine } from 'react-icons/ri';
import { useState, useEffect, useContext } from 'react';
// import "./ShoppingCartMobile.css"
import { NavLink } from 'react-router-dom';
import { FirebaseAuthContext } from '../../../FirebaseAuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import Link from 'next/link';
 


export function ShoppingCartMobile() {

const { user } = useContext( FirebaseAuthContext )


const [ cart, setCart ] = useState([])

const [total, setTotal] = useState(0)


useEffect(() => {
  if(user?.uid){

    const getCart = async () =>{
      
      const cartDoc = `users/${user.uid}/cart`
      const ref = collection(db, cartDoc)
      
      
      let data = await getDocs(ref)
      
      setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    
    getCart()
  }

  if(!user?.uid){
    const clientId = sessionStorage.getItem("clientId")

    const getCart = async () => {
      const cartDoc = `guestCarts/${clientId}/cart`
      const ref = collection(db, cartDoc)

      let data = await getDocs(ref)

      setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getCart()
  }

}, [user])

useEffect(() => {
  const sum = cart.map(item => item.quantity).reduce((a, b) => a + b, 0);
  setTotal(sum);
}, [cart, total]);



  return (
  <Link href='/cart' id='cartNavlink' >
    <section className='cartSectionMobile'>
      <RiShoppingCartLine />
      <div className='productCountMobileBackground'>
          <p className='productCountMobile' >{total}</p>
      </div>
    </section>
  </Link>
  );
}
