import React from 'react'
import { ProductListComponent } from '../homePage/ProductListComponent'

function BrichetiProductPage() {
  return (
    <div>
      <div className='brichetiProductPageTitleWrapper'>
        <div className='photoBricheti'></div>
        <h1>Brichete</h1>
      </div>
      <ProductListComponent filter={'Brichete'} />
    </div>
  )
}

export default BrichetiProductPage
