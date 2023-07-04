import Image from 'next/image'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import tocare from '../../publicResources/pozaTocare.jpg'

function ServiciiPageContent() {
  return (
    <section className='serviciiPageWrapper'>
      <div className='serviciiHeader'>
        <h1>Servicii</h1>
        <p>...o descriere despre serviciile noastre...</p>
      </div>

      <div className='tocMaterialVegetal'>
            <div className='tocMaterialVegetalBullets'>
              <div>
                <h1>Tocare Material Vegetal</h1>
                <p>Pentru tocare, acceptam urmatoarele:</p>
              </div>
              
              <div>
                <p><AiOutlineArrowRight/> Crengi provenite din toaletizarea arborilor</p>
                <p><AiOutlineArrowRight/> Vita de vie provenita din taiere</p>
              </div>

              <div>
                <h1>Pret: 200 RON/M&#179;</h1>
              </div>
            </div>

            <div className='tocMaterialVegetalImage'>
              <Image src={tocare} alt='imagineTocare' height={200} />
            </div>
            
      </div>

      <div className='inchiriereTocatorCrengi'>
        <div className='inchiriereTocatorCrengiContent'>
          <div>
            <h1>Inchiriem Tocator Crengi</h1>
            <p>Tocatorul de Crengi vine la pachet cu un operator.</p>
          </div>

          <div>
            <h1>Pret: 200 RON/H</h1>
          </div>

        </div>

        <div>
          <Image src={tocare} height={200} alt='imagineInchiriere'/>
        </div>
      </div>

      <div className='colectareInVederea'>
        <div className='colectareInVedereaContent'>
          <div>
            <h1>Colectare In Vederea Reciclarii Resurselor Vegetale</h1>
          </div>
        </div>

        <div>
          <Image src={tocare} height={200} alt='imagineColectare' />
        </div>
      </div>
    </section>
  )
}

export default ServiciiPageContent
