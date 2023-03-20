import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"
import React, { useCallback, useContext } from "react"
import { useEffect, useState } from "react"
import { db } from "../../../firebase-config"
import { FirebaseAuthContext }  from "../../../FirebaseAuthContext"
import { ReviewPageComponent } from "./ReviewPageComponent"

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from "../reusableComponents/Loading"

import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Link from "next/link"


export function Reviewpagesomething(){

    const { user, conditional } = useContext(FirebaseAuthContext)

    const [review, setReview] = useState([])

    const [ loading, setLoading ] = useState(false)

    const now = new Date();
    let minutes = now.getMinutes()

    minutes = minutes.toString().padStart(2, '0')

    const [language, setLanguage] = useState('GB')


    useEffect(() => {
      const lang = localStorage.getItem("language");
        if (lang) {
          setLanguage(lang);
      }

    }, [])

    useEffect(()=>{

        
        const getReviews = async () => {
            setLoading(true)
            const ref = collection(db, 'reviews')

            const data = await getDocs(ref)

            setReview(data.docs.map((doc) => ({...doc.data(), id:doc.id})))

            setLoading(false)
        };
        getReviews();

    }, [user])

    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const options = ["1","2","3","4","5"];
    const [selected, setSelected] = useState(options[0]);
    
function textChange(event){
setText(event.target.value)
}

function ratingChange(event){
setSelected(event.target.value)
}

function titleChange(event){
setTitle(event.target.value)
}

const postHandler = async (event) =>{
event.preventDefault()

const body = {
    reviewTitle: title,
    reviewText: text,
    reviewStar: selected,
    firstName: conditional.firstName,
    lastName: conditional.lastName,
    time : `${now.getDate()}.${now.getUTCMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${minutes}` ,
    user: user.uid
}


const ref = doc(db, `reviews/${title}`)

setDoc(ref, body)

}

const [slidesToShow, setSlidesToShow] = useState(1);

const CustomPrevArrow = React.memo((props) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className="arrow prev">
      <AiOutlineArrowLeft />
    </button>
  );
});

CustomPrevArrow.displayName = 'CustomPrevArrow';

const CustomNextArrow = React.memo((props) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className="arrow next">
      <AiOutlineArrowRight />
    </button>
  );
});

CustomNextArrow.displayName = 'CustomNextArrow';


const settings = {
  dots: true,
  infinite: true,
  // autoplay : true,
  autoplaySpeed: 3000,
  speed: 500,
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  };

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setSlidesToShow(1);
      } else if (window.innerWidth > 1000) {
        setSlidesToShow(3)
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener('load', handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('load', handleResize)
    };
  }, [setSlidesToShow]);
  

  const groupedReviews = [ [], [], [], [], [] ]; // Initialize an array of arrays for each star rating
  
  review.forEach((review) => {
    const starRating = parseInt(review.reviewStar);
    groupedReviews[starRating - 1].push(review);
  });

  const countsByRating = review.reduce((counts, review) => {
    const rating = review.reviewStar;
    counts[rating] = (counts[rating] || 0) + 1;
    return counts;
  }, {});

    return (
<>
        <section className="mainSection">
        
        <div className="header">
          {
            language === 'FR' ? 
            <>
              <h1>Page des avis</h1>
              <h4>Ici, vous pouvez voir comment tout le monde a évalué nos services !</h4>
              <h4>N&apos;oubliez pas de laisser le vôtre en remplissant le formulaire ci-dessous !</h4>
            </>
                    : language === 'GB' ? 
            <>
              <h1>Review Page</h1>
              <h4>Here you can see how everyone reviewed our services!</h4>
              <h4>Be sure to leave one yourself by completing the form below!</h4>
            </>
                    : language === 'RO' ? 
            <>
              <h1>Pagina de evaluare</h1>
              <h4>Aici puteti vedea cum a evaluat fiecare serviciile noastre!</h4>
              <h4>Asigurati-va ca lasati si dumneavoastra o recenzie completand formularul de mai jos!</h4>
            </>
                    : language === 'DE' ? 
            <>
              <h1>Bewertungsseite</h1>
              <h4>Hier können Sie sehen, wie jeder unsere Dienstleistungen bewertet hat!</h4>
              <h4>Stellen Sie sicher, dass Sie selbst eine hinterlassen, indem Sie das unten stehende Formular ausfüllen!</h4>
            </>
                    : language === 'IT' ? 
            <>
              <h1>Pagina delle recensioni</h1>
              <h4>Qui puoi vedere come tutti hanno recensito i nostri servizi!</h4>
              <h4>Assicurati di lasciarne uno tu stesso compilando il modulo qui sotto!</h4>
            </>
                    : 
            <>
              <h1>Review Page</h1>
              <h4>Here you can see how everyone reviewed our services!</h4>
              <h4>Be sure to leave one yourself by completing the form below!</h4>
            </>
          }

        </div>

        {user?.uid ? 
            <>
                <section>

                <div className="reviewForm">
                
                <div className="reviewInputBoxes">
                    <input id="text" type="text" onChange={titleChange} required></input>
                    { language === 'FR' ? <span>Titre</span>
                    : language === 'RO' ? <span>Titlu</span>
                    : language === 'DE' ? <span>Titel</span>
                    : language === 'IT' ? <span>Titolo</span>
                    : <span>Title</span>}
                </div>
                
                <div className="reviewInputBoxes">
                    <input id="text" type="text" onChange={textChange} required></input>
                    { language === 'FR' ? <span>Texte</span>
                    : language === 'RO' ? <span>Text</span>
                    : language === 'DE' ? <span>Text</span>
                    : language === 'IT' ? <span>Testo</span>
                    : <span>Text</span> }
                </div>

                <select onChange={ratingChange} required>
                    <option value="1">★</option>
                    <option value="2">★★</option>
                    <option value="3">★★★</option>
                    <option value="4">★★★★</option>
                    <option value="5">★★★★★</option>
                </select>

                    <button onClick={postHandler}>{language === 'FR' ? 'Poste'
                                                  : language === 'RO' ? 'Postare'
                                                  : language === 'DE' ? 'Beitrag'
                                                  : language === 'IT' ? 'Post'
                                                  : 'Post' }</button>
                </div>
                </section>
                </>
            : 
            <div className="notLoggedIn">

                {language === 'FR' ? <p>Vous devez <Link href="/login">vous connecter</Link> / <Link href="/register">vous inscrire</Link> pour laisser un commentaire.</p>
                : language === 'RO' ? <p>Trebuie sa va <Link href="/login">autentificati</Link> / <Link href="/register">inregistrati</Link> pentru a lasa un comentariu.</p>
                : language === 'DE' ? <p>Sie müssen sich <Link href="/login">anmelden</Link> / <Link href="/register">registrieren</Link>, um eine Bewertung abzugeben.</p>
                : language === 'IT' ? <p>Per lasciare una recensione, è necessario <Link href="/login">accedere</Link> / <Link href="/register">registrarsi</Link>.</p>
                : <p>You have to <Link href="/login">login</Link> / <Link href="/register">register</Link> to leave a review.</p>}
            
            </div>}
        </section>

        
        {loading ? (
  <Loading />
) : (
  groupedReviews
  .sort((a,b) => b[0]?.reviewStar - a[0]?.reviewStar)
  .map((reviews, index) => {
    return (
      <div key={index} className='lmao'>
        {reviews.length > 0 && reviews[0].reviewStar ? (
  language === 'FR' ? (
    <h2 className="reviewTitles">{`${reviews[0].reviewStar} étoile${reviews[0].reviewStar > 1 ? 's' : ''} (${countsByRating[reviews[0].reviewStar]})`}</h2>
  ) : language === 'RO' ? (
    <h2 className="reviewTitles">{`${reviews[0].reviewStar} ste${reviews[0].reviewStar > 1 ? 'le' : 'a'} (${countsByRating[reviews[0].reviewStar]})`}</h2>
  ) : language === 'DE' ? (
    <h2 className="reviewTitles">{`${reviews[0].reviewStar} Stern${reviews[0].reviewStar > 1 ? 'e' : ''} (${countsByRating[reviews[0].reviewStar]})`}</h2>
  ) : language === 'IT' ? (
    <h2 className="reviewTitles">{`${reviews[0].reviewStar} stell${reviews[0].reviewStar > 1 ? 'e' : 'a'} (${countsByRating[reviews[0].reviewStar]})`}</h2>
  ) : (
    <h2 className="reviewTitles">{`${reviews[0].reviewStar} star${reviews[0].reviewStar > 1 ? 's' : ''} (${countsByRating[reviews[0].reviewStar]})`}</h2>
  )
)  : (
          language === 'FR' ? <p>Aucun avis disponible.</p>
                  : language === 'GB' ? <p>No reviews available.</p>
                  : language === 'RO' ? <p>Nicio recenzie disponibilă.</p>
                  : language === 'DE' ? <p>Keine Bewertungen verfügbar.</p>
                  : language === 'IT' ? <p>Nessuna recensione disponibile.</p>
                  : <p>No reviews available.</p>
        )}
        {reviews.length > 0 ? (
          <Slider {...settings} className='slider'>
            {reviews.map((review) => (
              <ReviewPageComponent
                reviewTitle={review.reviewTitle}
                reviewText={review.reviewText}
                rating={review.reviewStar}
                firstName={review?.firstName}
                lastName={review.lastName}
                time={review.time}
                id={review.id}
                key={review.id}
              />
            ))}
          </Slider>
        ) : (
          language === 'FR' ? <p>Aucun avis disponible.</p>
                  : language === 'GB' ? <p>No reviews available.</p>
                  : language === 'RO' ? <p>Nicio recenzie disponibilă.</p>
                  : language === 'DE' ? <p>Keine Bewertungen verfügbar.</p>
                  : language === 'IT' ? <p>Nessuna recensione disponibile.</p>
                  : <p>No reviews available.</p>
        )}
      </div>
    );
  })
)}
</>
    )
}