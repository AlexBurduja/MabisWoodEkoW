import TocaturaProductPage from '@/components/ProdusePages/TocaturaProductPage'
import { Footer } from '@/components/reusableComponents/Footer'
import Header from '@/components/reusableComponents/Header'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import React from 'react'

function Tocatura() {
  return (
    <>
        <TopScrollProgress />
        <Header />
        <TocaturaProductPage />
        <Footer />
    </>
  )
}

export default Tocatura
