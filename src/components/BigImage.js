import { NavLink } from "react-router-dom";
import warehousePhotoBig from "../publicResources/warehousePngBig.webp"
import warehousePhotoMedium from "../publicResources/warehousePngMedium.webp"
import warehousePhotoSmall from "../publicResources/warehousePngSmall.webp"
import Image from "next/image";
import Link from "next/link";

export function BigImage() {


  return (
    <section className='imageSection'>
        <div>
        <Image
        src={warehousePhotoBig}
        srcSet={ `${warehousePhotoSmall} 500w , ${warehousePhotoMedium} 900w ,${warehousePhotoBig} 1280w` }
        sizes={"(max-width:500px) 500px,(max-width:900) 900px, 1280px"}
        alt="backgroundPhoto"/>
      </div>
     

    <div className='imageInfo'>
      <p>Mabis <span className='woodColor'>Wood</span><span className='ekoColor'> Eko</span>,</p>

      {localStorage.getItem('language') === "RO" ? 'Cei mai buni peleti din oras.' :
      localStorage.getItem('language') === "IT" ? 'Il miglior pellet in città.' :
      localStorage.getItem('language') === "DE" ? 'Die besten Pellets der Stadt.' :
      localStorage.getItem('language') === "FR" ? 'Les meilleurs pellets de la ville.':
      'The best pelets in town.'}
    </div>

    <div className='imageButtons'>
      <button>
        <Link href='/about'>
          {localStorage.getItem('language') === "RO" ? 'Despre noi' :
          localStorage.getItem('language') === "IT" ? 'Chi siamo' :
          localStorage.getItem('language') === "DE" ? 'Über uns' :
          localStorage.getItem('language') === "FR" ? "À propos de nous" :
          'About us'}
        </Link>
      </button>
      <button >
      <Link href="/contact">  
        {localStorage.getItem('language') === "RO" ? 'Contacteaza-ne' :
        localStorage.getItem('language') === "IT" ? 'Contattaci' :
        localStorage.getItem('language') === "DE" ? 'Kontaktiere uns' :
        localStorage.getItem('language') === "FR" ? 'Contactez-nous' :
        'Contact us'}
      </Link></button>
    </div>
    </section>
  );
}
