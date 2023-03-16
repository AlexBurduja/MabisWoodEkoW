import { BigImage } from '@/components/homePage/BigImage';
import { CreateProduct } from '@/components/homePage/CreateProduct';
import { ProductListComponent } from '@/components/homePage/ProductListComponent';
import { PreFooter } from '@/components/reusableComponents/PreFooter';
import { useContext } from 'react';
import { AuthProvider, FirebaseAuthContext } from '../../FirebaseAuthContext';
import { Footer } from '../components/reusableComponents/Footer';
import Header from '../components/reusableComponents/Header';

export default function Homepage() {


  return (
    <>
    <Header />
    <BigImage />
    <CreateProduct />
    <ProductListComponent />
    <PreFooter />
    <Footer />
    </>
  );
}
