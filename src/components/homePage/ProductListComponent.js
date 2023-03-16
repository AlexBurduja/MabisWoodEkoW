import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase-config';
import Loading from '../reusableComponents/Loading';
import { ProductCardComponent } from "./ProductCardComponent";

export function ProductListComponent() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

  const [language, setLanguage] = useState("GB");

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      setLanguage(lang);
    }
  }, [])
  
  
  useEffect(() => {
  const ref = collection(db , 'products')

  const getProducts = async () => {
    const data = await getDocs(ref)

    setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    setLoading(false)
  }

  getProducts();
}, [])

  
  return (
    <section className='listComponent'>
      <header>
        {language === "RO" ? 'Produse' :
        language === "IT" ? 'Prodotti' :
        language === "DE" ? 'Produkte' :
        language === "FR" ? 'Des produits' :
        'Products'}
      </header>
      {loading ? <Loading /> :
      <div className='gridUl' >
        {products.map((product) => {
          return (
                <ProductCardComponent
                key={product.id}
                title={product.title}
                kg={product.kg}
                currency={product.currency}
                price={product.price}
                image={product.image}
                description = {product.description}
                stripeId = {product.stripeId}
                id={product.id}>
                </ProductCardComponent>
            )
          })}
          </div>
      }
    </section>

    )
}
