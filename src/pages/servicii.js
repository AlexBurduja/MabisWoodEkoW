import { Footer } from '@/components/reusableComponents/Footer'
import Header from '@/components/reusableComponents/Header'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import ServiciiPageContent from '@/components/serviciiPage/ServiciiPageContent'
import React from 'react'

function Servicii() {
  return (
    <>
        <TopScrollProgress />
        <Header/>
        <ServiciiPageContent />
        <Footer/>
    </>
  )
}

export default Servicii
