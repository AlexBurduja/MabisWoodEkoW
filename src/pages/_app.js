import { useRouter } from 'next/router' 
import { AuthProvider} from '../../FirebaseAuthContext'

import 'react-toastify/dist/ReactToastify.css';

///This part was awfull trust me. Also, hi there stranger!

import '../styles/CssHeader.css'
import '../styles/Footer.css'
import '../styles/globals.css'
import '../styles/Image.css'
import '../styles/ShoppingCart.css'
import '../styles/ShoppingCartMobile.css'
import '../styles/ShoppingCartPage.css'
import '../styles/CreateProduct.css'
import '../styles/ProductCardComponent.css'
import '../styles/ProductCardComponentModal.css'
import '../styles/PreFooter.css'
import '../styles/Loading.css'
import '../styles/loginCss.css'
import '../styles/RegisterMulti.css'
import '../styles/ForgotPassPage.css'
import '../styles/BackToTop.css'
import '../styles/CancelPageCss.css'
import '../styles/topScrollProgress.css'
import '../styles/SuccessPageCss.css'
import '../styles/AboutPage.css'
import '../styles/AdminPanelComponent.css'
import '../styles/ContactForm.css'
import '../styles/ProfilePage.css'
import '../styles/PrivacyPolicyCss.css'
import '../styles/ReviewPageComponent.css'
import '../styles/SingleProductPage.css'
import '../styles/ER403.css'
import '../styles/ServiciiPage.css'
import '../styles/BlogPage.css'
import { useEffect } from 'react';
import { deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function App({ Component, pageProps }) {
  const router = useRouter()

  // localStorage.getItem(clientId)

  useEffect(() => {
    const deleteGuestCart = async () => {
      const clientId = sessionStorage.getItem('clientId');
      if (clientId) {
        try {
          await deleteDoc(db, `guestCarts/${clientId}`);
        } catch (error) {
          console.error("Error deleting guest cart:", error);
        }
      }
    };
  
    const cleanup = () => {
      deleteGuestCart();
    };
  
    window.addEventListener("unload", cleanup);
    window.addEventListener("beforeunload", cleanup);
  
    return () => {
      window.removeEventListener("unload", cleanup);
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1713135395890367',
        cookie: true,
        xfbml: true,
        version: 'v2.10'
      });

      FB.AppEvents.logPageView();

      // Check login status
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    };

    // Load Facebook SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      // User is logged into Facebook and your app
      console.log('User is logged in:', response.authResponse);
      // You can do additional logic here, such as redirecting to the logged-in experience
    } else if (response.status === 'not_authorized') {
      // User is logged into Facebook but not your app
      console.log('User is not authorized:', response.authResponse);
      // You can prompt the user to log in with FB.login() or show the Login Button
    } else {
      // User is not logged into Facebook
      console.log('User is not logged in:', response.authResponse);
    }
  };
  return ( 
      <AuthProvider>
        <Component {...pageProps} key={router.route} /> 
      </AuthProvider>
  )
}
