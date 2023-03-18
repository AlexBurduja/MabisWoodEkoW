import { AdminPanelFetch } from '@/components/adminPanel/AdminPanelFetch';
import { BackToTop } from '@/components/reusableComponents/BackToTop';
import { Footer } from '@/components/reusableComponents/Footer';
import Header from '@/components/reusableComponents/Header';
import { PreFooter } from '@/components/reusableComponents/PreFooter';
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress';
import React from 'react';

export default function AdminPanelList() {
  
  
  return (
    <>
      <TopScrollProgress />
      <Header />
      <AdminPanelFetch />
      <BackToTop />
      <PreFooter />
      <Footer />  
    </>
  );
}
