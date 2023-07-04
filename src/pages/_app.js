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

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return ( 
      <AuthProvider>
        <Component {...pageProps} key={router.route} /> 
      </AuthProvider>
  )
}
