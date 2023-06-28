import PeletiProductPage from '@/components/ProdusePages/PeletiProductPage'
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
      <PeletiProductPage />
      <Footer />
    </div>
  )
}

export default Peleti
