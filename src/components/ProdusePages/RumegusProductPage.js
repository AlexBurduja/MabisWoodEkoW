import React from 'react'
import { ProductListComponent } from '../homePage/ProductListComponent'

function RumegusProductPage() {
  return (
    <div>
      <div className='rumegusProductPageTitleWrapper'>
          <div className='photoRumegus'></div>
          <h1>Rumegus</h1>
      </div>
        <ProductListComponent filter={'Rumegus'}/>
    </div>    
  )
}

export default RumegusProductPage
