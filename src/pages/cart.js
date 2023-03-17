import { Footer } from '../components/reusableComponents/Footer';
import Header  from '../components/reusableComponents/Header';
import  ShoppingCartPage from '../components/cartPage/ShoppingCartPage';
import { PreFooter } from '@/components/reusableComponents/PreFooter';
import { BackToTop } from '@/components/reusableComponents/BackToTop';
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress';


export default function CartPage() {
  return (
    <>
      <TopScrollProgress />
      <Header />
        <ShoppingCartPage />
      <BackToTop />
      <PreFooter />
      <Footer />
    </>
  );
}
