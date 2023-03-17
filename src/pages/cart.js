import { Footer } from '../components/reusableComponents/Footer';
import Header  from '../components/reusableComponents/Header';
// import { BackToTop } from '../reusableComponents/BackToTop';
import  ShoppingCartPage from '../components/cartPage/ShoppingCartPage';
import { PreFooter } from '@/components/reusableComponents/PreFooter';
// import TopScrollProgress from '../reusableComponents/TopScrollProgress';

export default function CartPage() {
  return (
    <>
      {/* <TopScrollProgress /> */}
      <Header />
        <ShoppingCartPage />
      {/* <BackToTop /> */}
      <PreFooter />
      <Footer />
    </>
  );
}
