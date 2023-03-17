import { AboutComponent } from '@/components/about/AboutComponent'
import { BackToTop } from '@/components/reusableComponents/BackToTop'
import { Footer } from '@/components/reusableComponents/Footer'
import Header from '@/components/reusableComponents/Header'
import { PreFooter } from '@/components/reusableComponents/PreFooter'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import React from 'react'

export default function AboutPage() {
return (
    <>
    <TopScrollProgress />
    <Header />
    <AboutComponent />
    <BackToTop />
    <PreFooter />
    <Footer />
    </>
  )
}

