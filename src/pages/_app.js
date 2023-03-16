import { useRouter } from 'next/router' 
import { AuthProvider} from '../../FirebaseAuthContext'

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

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return ( 
      <AuthProvider>
        <Component {...pageProps} key={router.route} /> 
      </AuthProvider>
  )
}
