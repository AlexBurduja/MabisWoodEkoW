import React from 'react'
import { ProductListComponent } from '../homePage/ProductListComponent'

function PeletiProductPage() {

    return (
    <section>
      <div className='peletiProductPageTitleWrapper'>
        <div className='photoPeleti'></div>
        <h1>Peleti</h1>
      </div>
        <ProductListComponent filter={'Peleti'} />
    </section>
  )
}

export default PeletiProductPage
