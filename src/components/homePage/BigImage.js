import { NavLink } from "react-router-dom";
import warehousePhotoBig from "../../publicResources/warehousePngBig.webp"
import warehousePhotoMedium from "../../publicResources/warehousePngMedium.webp"
import warehousePhotoSmall from "../../publicResources/warehousePngSmall.webp"

import warehousePhoto from '../../publicResources/AdobeStock_320161570.jpeg'
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
        <div className="imageContainer">
        <Image
        src={warehousePhoto}
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
        <Link href='/peleti' className="imageButtonChild">
          {language === "RO" ? 'Peleti' :
          language === "IT" ? 'Chi siamo' :
          language === "DE" ? 'Über uns' :
          language === "FR" ? "À propos de nous" :
          'Pelets'}
        </Link>
      </button>

      <button>
      <Link href="/brichete">  
        {language === "RO" ? 'Brichete' :
        language === "IT" ? 'Contattaci' :
        language === "DE" ? 'Kontaktiere uns' :
        language === "FR" ? 'Contactez-nous' :
        'Briquettes'}
      </Link>
      </button>
    </div>
    </section>
  );
}
