import { BigImage } from '@/components/homePage/BigImage';
import { CreateProduct } from '@/components/homePage/CreateProduct';
import { ProductListComponent } from '@/components/homePage/ProductListComponent';
import { BackToTop } from '@/components/reusableComponents/BackToTop';
import { PreFooter } from '@/components/reusableComponents/PreFooter';
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress';
import { Footer } from '../components/reusableComponents/Footer';
import Header from '../components/reusableComponents/Header';
import About from '@/components/homePage/About';

export default function Homepage() {


  return (
    <>
    <TopScrollProgress />
    <BackToTop />
    <Header />
    <BigImage />
    <About />
    {/* <ProductListComponent /> */}
    <PreFooter />
    <Footer />
    </>
  );
}
