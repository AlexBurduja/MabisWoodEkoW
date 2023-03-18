import { useCallback, useContext, useEffect, useMemo, useState } from "react";
// import "./ProductCardComponent.css"
// import 'animate.css';
import { AiFillEdit } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../../../firebase-config";
import { addDoc, collection, deleteDoc, doc, FieldValue, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
import { storage } from "../../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuthContext } from "../../../FirebaseAuthContext";
import { async } from "@firebase/util";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import Link from "next/link";

/// Modal

export function ProductCardComponent(props) {

  const { title ,kg, currency,  price, image, description, id, stripeId } = props

  const { user, conditional } = useContext(FirebaseAuthContext)

  const [language, setLanguage] = useState("GB");

useEffect(() => {
  const lang = localStorage.getItem("language");
  if (lang) {
    setLanguage(lang);
  }
}, [])
  

  const useClientId = () => {

      const [clientId, setClientId] = useState(sessionStorage.getItem("clientId"));
      
      const generateId = () => Math.random().toString(36).substring(2, 18);
    
      
      
    useEffect(() => {
      if (!clientId) {
        const newClientId = generateId();
        sessionStorage.setItem("clientId", newClientId);
        setClientId(newClientId);
      }
    }, [clientId]);
  }
  useClientId();
  


  const handleImageChange = (e) => {
    if (e.target.files[0]){
      setFirebaseImg(e.target.files[0])
    }
  }

  const [modalEdit, setModalEdit] = useState(false);

  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  const toggleModalEdit = () => {
    setModalEdit(!modalEdit)
  };

  if(modalEdit) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  
  
  const [newTitle, setTitle] = useState(title)
  const [newCurrency, setCurrency] = useState(currency)
  const [newPrice, setPrice] = useState(price)
  const [newKg, setKg] = useState(kg)
  const [newImage, setImage] = useState(image)

  const [newDescription, setDescription] = useState(description)

  const [succes, setSucces] = useState('')
  const [ deleteSucces, setDeleteSucces ] = useState('')
  ///// End of Modal

  const [ firebaseImg, setFirebaseImg] = useState(null)
  const [url, setUrl] = useState(image)

  const handleSubmit = () => {
    const imageRef = ref(storage, firebaseImg.name);
    uploadBytes(imageRef, firebaseImg)
        .then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          setUrl(url)
          console.log(url)
      })
        .catch((error) => {
          console.log(error.message, "Error uploading")
      })
      setFirebaseImg(null)
    })
      .catch((error) => {
        console.log(error.message)
    })
  };
  
  const update = async () => {
    const userDoc = doc(db, 'products', id)
    
    const newFields = {
      title : newTitle,
      kg : newKg,
      price : newPrice,
      currency : newCurrency,
      description: newDescription,
      image : url
    }

    await updateDoc(userDoc, newFields)
      
    }
    


    function titleChange(event){
    setTitle(event.target.value)
  }

  function currencyChange(event){
    setCurrency(event.target.value)
  }

  function priceChange(event){
    setPrice(event.target.value)
  }

  function kgChange(event){
    setKg(event.target.value)
  }

  function descriptionChange(event){
    setDescription(event.target.value)
  }

  function imageChange(event){
    setImage(url)
  }
  /// CART

 

    // fetch(`${cartUrl}/?productId=${id}`)
    // .then(response => response.json())
    // .then (cartProducts => {
    //   const [ cartProduct ] = cartProducts; 

    //   if (cartProduct) {

    //       updateQuantity(cartProduct);
        
    //   } else {
        
    //     addToCart();

    //   }
    // })
  //Firebase api edit
  // const editProduct = async (id) => {
  //   const userDoc = doc(db, "products", id)
  //   await updateDoc(userDoc, {
  //     title : newTitle,
  //     price : newPrice,
  //     currency : newCurrency,
  //     kg : newKg ,
  //     image : newImage
  //   });
  // }


  // function editProductButton() {
  //   editProduct(id, title, image, kg, price, currency)
  // }
  
  const [counter, setCounter] = useState(2)
    
    const addToCart = async () => {
      
    if(user?.uid) {
    const cartDoc = `users/${user.uid}/cart`
    

    const newFields = {
      title : title,
      quantity: 1,
      price : price,
      currency: currency,
      kg: kg,
      stripeId : stripeId,
      image : url
    }

    const existingDoc = {
      quantity : counter
    }
    
    const docRef = doc(db, cartDoc, title+kg);
    const docSnap = await getDoc(docRef)
    const notifyAdd = () => toast.success(`Now having ${counter} ${title} in your cart!`, {
      autoClose: 2000
    })
    
    if(docSnap.exists()){
      console.log('clicked')
      setCounter(counter + 1)
      updateDoc(doc(db,cartDoc,title+kg), existingDoc)
      notifyAdd();
    } else {
      toast.success(`${title} added in cart!`, {
        autoClose: 2000
      })
        setDoc(doc(db, cartDoc, title+kg), newFields)
    }
  
    
  }

  if(!user?.uid){
    const clientId = sessionStorage.getItem("clientId")
    
    const cartDoc = `guestCarts/${clientId}/cart`

    const newFields = {
      title : title,
      quantity: 1,
      price : price,
      currency: currency,
      kg: kg,
      stripeId : stripeId,
      image : url
    }

    const existingDoc = {
      quantity : counter
    }

    const docRef = doc(db,cartDoc,title+kg);
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      setCounter(counter + 1)
      updateDoc(doc(db,cartDoc,title+kg), existingDoc)
      toast.success(`Now having ${counter} ${title} in your cart!`, {
        autoClose: 2000})
    } else {
      setDoc(doc(db, cartDoc, title+kg), newFields)
      toast.success(`${title} added in cart!`, {
        autoClose: 2000
      })
    }

  }
  
}


  function deleteItem(id){
    const userDoc = doc(db, `products/${id}`)

    deleteDoc(userDoc)
  }

  return (
        <>
    <div id="product" className="cardDiv">
        <h2>{title}</h2>
        <Image src={image} width={200} height={200} alt="productImage" className="productImg"/>
        <p className="kgP">{kg} Kg</p>
        <p className="priceCurrencyP">{price} {currency}</p>

        <button  className="cardDivButton" onClick={addToCart}>{language === 'FR' ? 'Ajouter au panier' :
 language === 'RO' ? 'Adauga în cos' :
 language === 'DE' ? 'Warenkorb Legen' :
 language === 'IT' ? 'Aggiungi al carrello' :
 'Add to cart'}</button>
        <ToastContainer />
    
        <a href={`products/${id}`} className="viewMoreButton"> {language === 'FR' ? 'Voir plus' :
 language === 'RO' ? 'Vezi mai multe' :
 language === 'DE' ? 'Mehr anzeigen' :
 language === 'IT' ? 'Vedi di più' :
 'View more'} </a>

        {conditional?.admin && (
          <button onClick={toggleModalEdit} className="edit-btn">< AiFillEdit /></button>
        )}
      
    </div>

        {modalEdit && (
          <div className="modal">
            <div onClick={toggleModalEdit} className="overlay"></div>
              <div className="modal-content modal-content-main">
                <h1>Edit product</h1>
                  <p className="modal-content_p">Here you can change anything that you want regarding your product..</p>

                  <div className="modal-content-inputs">
                    
                    <div className="modal-content-inputs_div">
                    <label for="title">Title :</label>
                    <input id="title" defaultValue={title} onChange={titleChange}  ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="kg">Kg :</label>
                    <input id="kg" defaultValue={kg}  onChange={kgChange} ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="price">Price :</label>
                    <input id="price" defaultValue={price} onChange={priceChange}  ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="currency">Currency :</label>
                    <input id="currency" defaultValue={currency} onChange={currencyChange} ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="descrption">Description :</label>
                    <input id="descrption" defaultValue={description} onChange={descriptionChange} ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="image">Image :</label>
                    <input id="image" defaultValue={image} onChange={imageChange} ></input>
                    </div>

                    <div>
                      <label>Image :</label>
                      <input type="file" onChange={handleImageChange}></input>
                      <button onClick={handleSubmit}>Upload Image</button>
                    </div>
                  </div>

                  <div className="modal-content-buttons">
                  <button  className="modal-content-button_delete" onClick={() => deleteItem(id)}>Delete Item</button>
                  <button className="modal-content-button_save" onClick={update} >Save Changes</button>
                  </div>
                  
                  <button className="close-modal" onClick={toggleModalEdit}>
                    X
                  </button>
            </div>
          </div>
        )}
      </>
  )
}

