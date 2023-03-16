import { NavLink } from "react-router-dom";
import warehousePhotoBig from "../../publicResources/warehousePngBig.webp"
import warehousePhotoMedium from "../../publicResources/warehousePngMedium.webp"
import warehousePhotoSmall from "../../publicResources/warehousePngSmall.webp"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function BigImage() {

  const [language, setLanguage] = useState("GB");

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      setLanguage(lang);
    }
  }, []);

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

      {language === "RO" ? 'Cei mai buni peleti din oras.' :
      language === "IT" ? 'Il miglior pellet in città.' :
      language === "DE" ? 'Die besten Pellets der Stadt.' :
      language === "FR" ? 'Les meilleurs pellets de la ville.':
      'The best pelets in town.'}
    </div>

    <div className='imageButtons'>
      <button>
        <Link href='/about'>
          {language === "RO" ? 'Despre noi' :
          language === "IT" ? 'Chi siamo' :
          language === "DE" ? 'Über uns' :
          language === "FR" ? "À propos de nous" :
          'About us'}
        </Link>
      </button>
      <button >
      <Link href="/contact">  
        {language === "RO" ? 'Contacteaza-ne' :
        language === "IT" ? 'Contattaci' :
        language === "DE" ? 'Kontaktiere uns' :
        language === "FR" ? 'Contactez-nous' :
        'Contact us'}
      </Link></button>
    </div>
    </section>
  );
}
