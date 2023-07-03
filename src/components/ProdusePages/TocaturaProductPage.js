import React from 'react'
import { ProductListComponent } from '../homePage/ProductListComponent'

function TocaturaProductPage() {
  return (
    <div>
      <div className='tocaturaProductPageTitleWrapper'>
        <div className='photoTocatura'></div>
        <h1>Tocatura Lemn</h1>
      </div>
    <ProductListComponent filter={'Tocatura'} />
    </div>
  )
}

export default TocaturaProductPage
