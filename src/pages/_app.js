import '@/styles/globals.css'
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider} from '../../FirebaseAuthContext'

export default function App({ Component, pageProps }) {
  return ( 
    <Router>
  <AuthProvider>
    <Component {...pageProps} /> 
  </AuthProvider>
    </Router>
  )
}
