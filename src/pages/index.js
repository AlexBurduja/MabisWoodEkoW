import { useContext } from 'react';
import { AuthProvider, FirebaseAuthContext } from '../../FirebaseAuthContext';
import { Footer } from './Footer';
import Header  from './Header';

export default function Homepage() {

  const {user, conditional} = useContext(FirebaseAuthContext)

  console.log(conditional)

  return (
    <>
    <Header />
    <Footer />
    </>
  );
}
