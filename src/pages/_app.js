import { useRouter } from 'next/router' 
import { AuthProvider} from '../../FirebaseAuthContext'

import '../styles/CssHeader.css'
import '../styles/Footer.css'
import '../styles/globals.css'
import '../styles/Image.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return ( 
      <AuthProvider>
        <Component {...pageProps} key={router.route} /> 
      </AuthProvider>
  )
}
