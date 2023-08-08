import { RiShoppingCartLine } from 'react-icons/ri';
import { useState, useEffect, useContext } from 'react';
import { FirebaseAuthContext } from '../../../FirebaseAuthContext';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import Link from 'next/link';

export function ShoppingCart() {
  const { user } = useContext(FirebaseAuthContext);
  const [language, setLanguage] = useState('GB');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const lang = localStorage.getItem('language');
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  useEffect(() => {
    let unsubscribe;

    const getCart = async () => {
      if (user?.uid) {
        const cartDoc = `users/${user.uid}/cart`;
        const ref = collection(db, cartDoc);

        unsubscribe = onSnapshot(ref, (snapshot) => {
          const cartData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setCart(cartData);
          const sum = cartData.reduce((acc, item) => acc + item.quantity, 0);
          setTotal(sum);
        });
      } else if (!user?.uid) {
        const clientId = sessionStorage.getItem('clientId');
        const cartDoc = `guestCarts/${clientId}/cart`;
        const ref = collection(db, cartDoc);

        unsubscribe = onSnapshot(ref, (snapshot) => {
          const cartData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setCart(cartData);
          const sum = cartData.reduce((acc, item) => acc + item.quantity, 0);
          setTotal(sum);
        });
      }
    };

    getCart();

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts
    };
  }, [user]);

  const [cart, setCart] = useState([]);

  function ProductCount() {
    return (
      <p>
        {language === 'RO'
          ? total === 1
            ? `${total} produs`
            : `${total} produse`
          : language === 'IT'
          ? total === 1
            ? `${total} prodotto`
            : `${total} prodotti`
          : language === 'DE'
          ? total === 1
            ? `${total} produkt`
            : `${total} produkte`
          : language === 'FR'
          ? total === 1
            ? `${total} produit`
            : `${total} produits`
          : total === 1
          ? `${total} product`
          : `${total} products`}
      </p>
    );
  }

  return (
    <Link href="/cart" id="cartNavlink">
      <section className="cartSection">
        <RiShoppingCartLine />
        <ProductCount />
      </section>
    </Link>
  );
}
