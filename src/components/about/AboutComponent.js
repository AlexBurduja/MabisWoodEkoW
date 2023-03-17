/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'

import  photo1  from '../../publicResources/imagineBricheti1.jpeg'
import  photo2  from '../../publicResources/imagineBricheti2.jpeg'
import  photo3  from '../../publicResources/imagineBricheti3.jpeg'

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

import { useEffect } from 'react'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db, storage } from '../../../firebase-config'

import  ConvertApi  from 'convertapi-js'
import { useState } from 'react'
import Loading from '../reusableComponents/Loading'
import { FirebaseAuthContext } from '../../../FirebaseAuthContext'
import Image from 'next/image'

export function AboutComponent (){

    const { conditional } = useContext(FirebaseAuthContext)

    const [firebaseImg , setFirebaseImg] = useState(null)
    const [url, setUrl] = useState(null)
    const [imgUrl, setImgUrl] = useState(null);

    const [imagess, setImages] = useState([])
    const [loading , setLoading] = useState(true)
    const [country, setCountry] = useState('England')

    const [language, setLanguage] = useState("GB");

    useEffect(() => {
      const lang = localStorage.getItem("language");
        if (lang) {
          setLanguage(lang);
        }
    }, [])

    console.log(imagess)

    
    useEffect(() => {
      const getProducts = async () => {
        const ref = collection(db, "aboutImages");
        const data = await getDocs(ref);
        setImages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      };
      getProducts();
    }, []);

    const handleImageChange = (e) => {
        if (e.target.files[0]){
          setFirebaseImg(e.target.files[0])
          setImgUrl(URL.createObjectURL(e.target.files[0]))
        }
      }

    const handleSubmit = async () => {
        let convertApi = ConvertApi.auth('Af27QSYWI7JGHdxc')
        let params = convertApi.createParams()
        params.add('file', firebaseImg);
        let result = await convertApi.convert('jpg', 'webp', params)
      
        const convertedImage = result.files[0].Url;
      
        const imageRef = ref(storage, `aboutImages/${firebaseImg.name.split('.')[0]}`);
      
        fetch(convertedImage)
          .then(res => res.arrayBuffer())
          .then(arrayBuffer => {
            uploadBytes(imageRef, arrayBuffer, {
              contentType: 'image/webp'
            })
            .then(() => {
              getDownloadURL(imageRef)
              .then((url) => {
                setUrl(url);
                try {
                  setDoc(doc(db, `aboutImages/${firebaseImg.name.split('.')[0]}`), {
                    url: url
                  });
                } catch (e) {
                  console.log(e);
                }
              })
              .catch((error) => {
                console.log(error.message, "Error uploading");
              });
              setFirebaseImg(null);
            })
            .catch((error) => {
              console.log(error.message);
            });
          });
      };
    
    const images = [
        { src: photo1 , alt: "Image 1" },
        { src: photo2 , alt: "Image 2" },
        { src: photo3 , width: '300px', height: '300px', alt: "Image 3" },
      ];


    const settings = {
        dots: true,
        infinite: true,
        autoplay : true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
      };

        function CustomPrevArrow(props) {
          const { onClick } = props;
          return (
            <button onClick={onClick} className="arrow prev">
              <AiOutlineArrowLeft />
            </button>
          );
        }
      
        function CustomNextArrow(props) {
          const { onClick } = props;
          return (
            <button onClick={onClick} className="arrow next">
              <AiOutlineArrowRight />
            </button>
          );
        }

        function handleDeleteImage(image) {
            const storageRef = ref(storage, image.url);
            deleteObject(storageRef)

            deleteDoc(doc(db, `aboutImages/${image.id}`))
            
            console.log('jobs done')
          }



          
  console.log(imagess)

    return (
    <section className='aboutSection'>
    <h1>{language === 'FR' ? 'À propos de nous' : 
          language === 'RO' ? 'Despre noi' :
          language === 'DE' ? 'Über uns' :
          language === 'IT' ? 'Chi siamo' :
          'About us'}
    </h1>

    <div className='aboutWrapper'>
        <div className='aboutWrapperWrapper'>
            <div>
                <Image className='photo1' src={photo1} alt='poza' width={300} height={300} />
            </div>
            
            <div>
            {language === "RO" ? <p>Avand <strong>15 ani</strong> de experienta în productia de mobilier din lemn si <strong>70</strong> de <strong>colegi dedicati</strong>, ne-am concentrat asupra unei noi afaceri - productia de <strong>peleti</strong> si <strong>brichete</strong>. In timpul unei vacante în Grecia, am intalnit o persoana care ne-a inspirat sa aducem în Romania o masina care transforma <strong>crengile uscate în rumegus de lemn</strong>. Dupa cercetari, am descoperit ca acest rumegus poate fi transformat in <strong>peleti</strong> si <strong>brichete</strong>, produse care sunt foarte cautate pe piata.</p>
            :
            language === "IT" ? <p>Con <strong>15 anni</strong> di esperienza nella produzione di mobili in legno e <strong>70 colleghi dedicati</strong>, abbiamo cambiato il nostro focus su una nuova attività - la produzione di <strong>pellets</strong> e <strong>briquettes</strong>. Durante una vacanza in Grecia, abbiamo incontrato una persona che ci ha ispirato a portare in Romania una macchina che trasforma <strong>rami secchi in trucioli di legno</strong>. Dopo ricerche, abbiamo scoperto che questi trucioli di legno possono essere trasformati in <strong>pellets</strong> e <strong>briquettes</strong>, prodotti molto richiesti sul mercato.</p>
            :
            language === "DE" ? <p>Mit <strong>15 Jahren</strong> Erfahrung in der Herstellung von Holzmöbeln und <strong>70 engagierten Kollegen</strong> haben wir uns auf ein neues Geschäftsfeld konzentriert - die Produktion von <strong>Pellets</strong> und <strong>Briketts</strong>. Während eines Urlaubs in Griechenland trafen wir jemanden, der uns inspirierte, eine Maschine, die <strong>getrocknete Äste in Holzspäne</strong> verwandelt, nach Rumänien zu bringen. Nach Recherchen stellten wir fest, dass diese Holzspäne in <strong>Pellets</strong> und <strong>Briketts</strong> umgewandelt werden können, Produkte, die auf dem Markt sehr gefragt sind.</p>
:
            language === "FR" ? <p>Avec <strong>15 ans</strong> d&apos;expérience dans la fabrication de meubles en bois et <strong>70 collègues dévoués</strong>, nous nous sommes concentrés sur une nouvelle entreprise : la production de <strong>pellets</ strong> et <strong>briquettes</strong>. Lors de vacances en Grèce, nous avons rencontré quelqu&apos;un qui nous a inspiré pour apporter une machine qui transforme les <strong>branches sèches en copeaux de bois</strong> en Roumanie. Après recherche, nous avons découvert que ces copeaux de bois pouvaient être transformés en <strong>pellets et briquettes</strong>, des produits très demandés sur le marché.</p>
            
:
            <p>With <strong>15 years</strong> of experience in manufacturing wooden furniture and <strong>70 dedicated colleagues</strong>, we shifted our focus to a new business venture - the production of <strong>pellets</strong> and <strong>briquettes</strong>. During a vacation in Greece, we met someone who inspired us to bring a machine that transforms <strong>dry branches into wood chips</strong> to Romania. After research, we discovered that these wood chips can be transformed into <strong>pellets and briquettes</strong>, products that are in high demand on the market.</p>}

            </div>
        </div>

        <div className='aboutWrapperWrapperSecond'>
            <div>
                <Image className='photo2' src={photo2} alt='poza' width={300} height={300} />
            </div>
            
            <div>
                {language === 'RO' ? 
                <p>Cu un teren si un depozit în orasul <strong>Bogati</strong> din <strong>Arges</strong>, am inceput productia cu ajutorul unei echipe de <strong>6</strong> persoane <strong>dedicate</strong> si utilaje <strong>profesionale</strong>. <strong>Prefectionismul</strong> nostru ne-a condus sa testam produsele și sa gasim formula <strong>perfecta</strong> pentru a oferi <strong>confort</strong> si <strong>satisfactie</strong> clientilor nostri. Acum, ne propunem sa aducem acest confort în casele dvs. prin intermediul <strong>peletilor</strong> nostri de inalta calitate.</p>
                :
                language === "DE" ? <p>Mit einem Grundstück und einem Lagerhaus in der Stadt <strong>Bogati</strong> in <strong>Arges</strong> haben wir mit Hilfe eines Teams von <strong>6</strong> engagierten Personen und <strong>professionellen</strong> Geräten die Produktion begonnen. Unsere <strong>Perfektion</strong> hat uns dazu geführt, Produkte zu testen und die <strong>perfekte</strong> Formel zu finden, um unseren Kunden <strong>Komfort</strong> und <strong>Zufriedenheit</strong> zu bieten. Jetzt streben wir danach, diesen Komfort durch unsere hochwertigen <strong>Pellets</strong> in Ihre Häuser zu bringen.</p>
                :
                language === "IT" ? <p>Con un terreno e un deposito nella città di <strong>Bogati</strong> in <strong>Arges</strong>, abbiamo iniziato la produzione con l&apos;aiuto di un team di <strong>6</strong> persone <strong>dedicate</strong> e attrezzature <strong>professionali</strong>. La nostra <strong>perfezione</strong> ci ha portato a testare i prodotti e trovare la formula <strong>perfetta</strong> per offrire <strong>comfort</strong> e <strong>soddisfazione</strong> ai nostri clienti. Ora ci proponiamo di portare questo comfort nelle vostre case attraverso i nostri pellet di alta qualità.</p> 
:
                language === "FR" ? <p>Avec un terrain et un entrepôt dans la ville de <strong>Bogati</strong> à <strong>Arges</strong>, nous avons démarré la production avec l&apos;aide d&apos;une équipe de <strong>6</strong > des personnes dévouées et des machines professionnelles. Notre <strong>perfectionnisme</strong> nous a amené à tester les produits et à trouver la formule parfaite pour offrir <strong>confort</strong> et <strong>satisfaction</strong> à nos clients. Maintenant, nous visons à apporter ce <strong>confort</strong> à vos maisons grâce à nos <strong>pellets</strong> de haute qualité.</p>
:               
                <p>With a plot of land and a warehouse in the town of <strong>Bogati</strong> in <strong>Arges</strong>, we started production with the help of a team of <strong>6</strong> dedicated individuals and professional machinery. Our <strong>perfectionism</strong> led us to test the products and find the perfect formula to offer <strong>comfort</strong> and <strong>satisfaction</strong> to our customers. Now, we aim to bring this <strong>comfort</strong> to your homes through our high-quality <strong>pellets</strong>.</p>}
            </div>
        </div>

        <div className='aboutWrapperWrapper'>
            <div>
                <Image className='photo3' src={photo3} alt='poza' width={300} height={300} />
            </div>
            
            <div>
                {language === "RO" ? 
                <p>Suntem mandrii sa spunem ca suntem dedicati furnizarii de <strong>produse de calitate superioara</strong> și de <strong>servicii exceptionale</strong> clientilor nostri. Ne concentram intotdeauna pe imbunatatirea <strong>proceselor de productie</strong> si utilizam <strong>tehnologii avansate</strong> pentru a ne asigura ca <strong>peletii</strong> si <strong>brichetele</strong> noastre sunt produse cu <strong>precizie si eficienta</strong>. Suntem, de asemenea, preocupati de impactul pe care il avem asupra mediului inconjurator. Folosim materii prime de <strong>inalta calitate</strong> si <strong>resurse regenerabile</strong> pentru a produce <strong>peletii</strong> si <strong>brichetele</strong> noastre, iar, obiectivul nostru este de a reduce <strong>emisiile de carbon</strong> prin utilizarea de metode <strong>sustenabile si eficiente din punct de vedere energetic</strong></p>

                :

                language === "IT" ? 
                <p>Siamo orgogliosi di affermare di essere impegnati nella fornitura di <strong>prodotti di alta qualità</strong> e <strong>servizi eccezionali</strong> ai nostri clienti. Siamo sempre concentrati nel migliorare i nostri <strong>processi produttivi</strong> e utilizziamo <strong>tecnologie avanzata</strong> per garantire che i nostri <strong>pellet</strong> e <strong>briketti</strong> vengano prodotti con <strong>precisione ed efficienza</strong>. Siamo anche preoccupati dall&apos;impatto che abbiamo sull&apos;ambiente. Utilizziamo materie prime di <strong>alta qualità</strong> e <strong>risorse rinnovabili</strong> per produrre i nostri <strong>pellet</strong> e <strong>briketti</strong>, e il nostro obiettivo è quello di ridurre le <strong>emissioni di carbonio</strong> utilizzando metodi <strong>sostenibili ed efficienti dal punto di vista energetico</strong>.</p>

    : 
                language === "DE" ? <p>Wir sind stolz darauf, dass wir uns der Lieferung von <strong>hochwertigen Produkten</strong> und <strong>herausragenden Dienstleistungen</strong> für unsere Kunden widmen. Wir konzentrieren uns ständig darauf, unsere <strong>Produktionsprozesse</strong> zu verbessern und verwenden <strong>fortschrittliche Technologien</strong>, um sicherzustellen, dass unsere <strong>Pellets</strong> und <strong>Briketts</strong> mit <strong>Präzision und Effizienz</strong> produziert werden. Wir sind auch besorgt über unseren Einfluss auf die Umwelt. Wir verwenden <strong>hochwertige Rohstoffe</strong> und <strong>erneuerbare Ressourcen</strong></p>
    :

                language === "FR" ? <p>Nous sommes fiers de dire que nous nous engageons à fournir des <strong>produits de qualité supérieure</strong> et un <strong>service exceptionnel</strong> à nos clients. Nous nous concentrons toujours sur l&apos;amélioration de nos <strong>processus de production</strong> et l&apos;utilisation de <strong>technologies avancées</strong> pour nous assurer que nos <strong>pellets</strong> et <strong>briquettes</strong> sont produits avec <strong>précision et efficacité</strong>. Nous sommes également préoccupés par l&apos;impact que nous avons sur l&apos;environnement. Nous utilisons des matières premières de haute qualité et des <strong>ressources renouvelables</strong> pour produire nos <strong>pellets</strong> et <strong>briquettes</strong>, et nous nous engageons à réduire les <strong>émissions de carbone</strong> en utilisant <strong>des méthodes durables et économes en énergie</strong>.</p>
:
                <p>We are proud to say that we are committed to providing <strong>superior quality products</strong> and <strong>exceptional service</strong> to our customers. We always focus on improving our <strong>production processes</strong> and using <strong>advanced technologies</strong> to ensure that our <strong>pellets</strong> and <strong>briquettes</strong> are produced with <strong>precision and efficiency</strong>. We are also concerned about the impact we have on the environment. We use high-quality raw materials and <strong>renewable resources</strong> to produce our <strong>pellets</strong> and <strong>briquettes</strong>, and we are dedicated to reducing <strong>carbon emissions</strong> by using <strong>sustainable and energy-efficient methods</strong>.</p>
            }
            </div>
        </div>

    </div>


    {conditional.admin  && (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <div className='imageSection'>
                <input type="file" onChange={handleImageChange}></input>
                {imgUrl && <img src={imgUrl} alt="preview" width={350} height={350} />}
                {firebaseImg && <button onClick={handleSubmit}>Select Image</button>}
            </div>
        </div>
    )}

    <div className='carouselMainDiv' >
        
        <h2>{language === "RO" ? 'Poze' : 'Photos'} </h2>

{loading ? <Loading /> : 
        <Slider className='sliderElement' {...settings}>
        
            {imagess.map((image) => (
                
            <div key={image.id} className='carouselDiv' >


                <img src={image.url} alt={image.alt}  className='sliderImage' />

                {conditional.admin === true && (
                  <p onClick={() => handleDeleteImage(image)}><TiDelete /></p>
                )}
              
            </div>

            ))}
        </Slider>
}

    </div>
    
  </section>
  )

}
