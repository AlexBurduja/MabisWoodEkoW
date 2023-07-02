import PeletiProductPage from '@/components/ProdusePages/PeletiProductPage'
import { CreateProduct } from '@/components/homePage/CreateProduct'
import { ProductListComponent } from '@/components/homePage/ProductListComponent'
import { Footer } from '@/components/reusableComponents/Footer'
import Header from '@/components/reusableComponents/Header'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import React from 'react'

function Peleti() {
  return (
    <div>
      <TopScrollProgress /> 
      <Header/>
      <CreateProduct />
      <PeletiProductPage />
      <Footer />
    </div>
  )
}

export default Peleti
