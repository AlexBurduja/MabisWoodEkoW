import { BackToTop } from '@/components/reusableComponents/BackToTop';
import { Footer } from '@/components/reusableComponents/Footer';
import Header from '@/components/reusableComponents/Header';
import { PreFooter } from '@/components/reusableComponents/PreFooter';
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress';
import { Reviewpagesomething } from '@/components/reviewPage/Reviewpagesomething';
import React from 'react';


export default function ReviewPage() {
  return (
    <>
      <TopScrollProgress />
      <Header />
      <Reviewpagesomething />
      <BackToTop />
      <PreFooter />
      <Footer />
    </>
  );
}
