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
              
              <div className='tocMaterialVegetalBullets__bullets'>
                <p className='bold'><AiOutlineArrowRight/> Crengi provenite din toaletizarea arborilor</p>
                <p className='bold'><AiOutlineArrowRight/> Vita de vie provenita din taiere</p>
              </div>

              <div>
                <h1>Pret: 200 RON/M&#179;</h1>
              </div>
            </div>

            <div className='imageDiv'>
              <Image src={tocare} alt='imagineTocare' height={200} />
            </div>
            
      </div>

      <div className='evacuareResturiVegetale'>
        <div className='evacuareResturiVegetaleContent'>
          <h1>Evacuare Resturi Vegetale</h1>

          <p>In urma <span className='bold'>tocarii materialului vegetal</span> este posibila si <span className='bold'>evacuarea tocaturii rezultate in urma tocarii resturilor vegetale</span> de pe <span className='bold'>proprietatea dumneavoastra</span>.</p>

          {/* <p>Ca si exemplu: Doriti evacuarea a 30 M&#179; de resturi vegetale. Costurile vor fi urmatoarele: 200RON * 30M&#179; (Tocarea Materialului) + 50RON * 30M&#179;(Evacuarea Materialului) = 7500 RON.</p> */}
          
          <div>
            <h1>Pret: 50 RON/M&#179;</h1>
          </div>
        
        </div>

        <div className='imageDiv'>
          <Image src={tocare} height={200} alt='imagineEvacuare' />
        </div>
      </div>

      <div className='inchiriereTocatorCrengi'>
        <div className='inchiriereTocatorCrengiContent'>
          <div>
            <h1>Inchiriem Tocator Crengi</h1>
            <p><span className='bold'>Tocatorul de Crengi</span> vine la pachet cu un <span className='bold'>operator</span>.</p>
          </div>

          <div>
            <h1>Pret: 200 RON/H</h1>
          </div>

        </div>

        <div className='imageDiv'>
          <Image src={tocare} height={200} alt='imagineInchiriere'/>
        </div>
      </div>

      <div className='colectareInVederea'>
        <div className='colectareInVedereaContent'>
            <h1>Colectare in Vederea Reciclarii Resurselor Vegetale</h1>
            
            <div>
              <p>Adu-ne lemnul de care nu mai ai nevoie.</p>
              <p>Trebuie sa ai in vedere faptul ca lemnele nu trebuie sa contina:</p>
            </div>
            
            <div className='colectareInVedereaContent__bullets'>
              <p><AiOutlineArrowRight/>Pamant</p>
              <p><AiOutlineArrowRight/>Fier</p>
              <p><AiOutlineArrowRight/>Plastic</p>
              <p><AiOutlineArrowRight/>Pietre</p>
              <p><AiOutlineArrowRight/>Etc.</p>
            </div>

          </div>

        <div className='imageDiv'>
          <Image src={tocare} height={200} alt='imagineColectare' />
        </div>
      </div>

      <div className='uscareRumegus'>
        <div className='uscareRumegusContent'>
          <h1>Uscare Rumegus</h1>

          <div>
          <p>Adu-ne rumegusul si noi ti-l putem usca.</p>
          </div>

          <div>
            Pret: Nustim/KG
          </div>
        </div>
        
        <div className='imageDiv'>
          <Image src={tocare} alt='imagineUscare' height={200}/>
        </div>
      </div>
    </section>
  )
}

export default ServiciiPageContent
