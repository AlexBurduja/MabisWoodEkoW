import BrichetiProductPage from '@/components/ProdusePages/BrichetiProductPage'
import { Footer } from '@/components/reusableComponents/Footer'
import Header from '@/components/reusableComponents/Header'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import React from 'react'

function Bricheti() {
  return (
    <>
    <TopScrollProgress />
    <Header />
    <BrichetiProductPage />
    <Footer />
    </>
  )
}

export default Bricheti
