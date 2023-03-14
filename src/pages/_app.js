import '@/styles/globals.css'
import { FirebaseAuthContext } from '../../FirebaseAuthContext'
import { Header } from './Header'

export default function App({ Component, pageProps }) {
  return ( 
  <FirebaseAuthContext>
    <Header />
    <Component {...pageProps} /> 
  </FirebaseAuthContext>
  )
}
