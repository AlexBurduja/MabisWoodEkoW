import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { ShoppingCartPage } from "./ShoppingCartPage";
import { FirebaseAuthContext } from "../../../FirebaseAuthContext";

export function ShopCartGet(){

    const [titles, setTitles] = useState([])
    const ref = collection(db , 'products')

    useEffect(() => {
        function getTitles(){
      
          const getProducts = async () => {
            let data = await getDocs(ref)
            
            setTitles(data.docs.map((doc) => (doc.data())))
          }
          
          getProducts()
        }
      
        getTitles()
      }, [])



    return (
    <>
        {titles.map((item) => (
        <ShoppingCartPage
        currency = {item.currency}
        image = {item.image}
        kg = {item.kg}
        price = {item.price}
        quantity = {item.quantity}
        title = {item.title}
        id = {item.id}
        key = {item.id}
        >
        </ShoppingCartPage>
        ))}
    </>
    )
}