import { Footer } from '../components/reusableComponents/Footer';
import Header  from '../components/reusableComponents/Header';
// import { PreFooter } from '../reusableComponents/PreFooter';
// import { BackToTop } from '../reusableComponents/BackToTop';
import  ShoppingCartPage from '../components/cartPage/ShoppingCartPage';
// import TopScrollProgress from '../reusableComponents/TopScrollProgress';
// import { ProductListComponent } from '../homePage/ProductListComponent';
// import { ShoppingCart } from '../components/cartPage/ShoppingCart';
// import { ShopCartGet } from '../components/cartPage/ShopCartGet';


export default function CartPage() {
  return (
    <>
      {/* <TopScrollProgress /> */}
      <Header />
        <ShoppingCartPage />
      {/* <BackToTop /> */}
      {/* <PreFooter /> */}
      <Footer />
    </>
  );
}
