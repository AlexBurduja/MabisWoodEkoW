import BrichetiProductPage from '@/components/ProdusePages/BrichetiProductPage'
import { CreateProduct } from '@/components/homePage/CreateProduct'
import { Footer } from '@/components/reusableComponents/Footer'
import Header from '@/components/reusableComponents/Header'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import React from 'react'

function Brichete() {
  return (
    <>
    <TopScrollProgress />
    <Header />
    <BrichetiProductPage />
    <CreateProduct />
    <Footer />
    </>
  )
}

export default Brichete
