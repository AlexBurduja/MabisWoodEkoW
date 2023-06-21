import Image from 'next/image';
import { useState, useEffect } from 'react';
import Loading from './reusableComponents/Loading';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import logo from '../publicResources/google-logo-9808.png'

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);

  const [language, setLanguage] = useState("GB")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
        setLanguage(storedLanguage);
      }
  }, [])

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/getReviews?language=${language === "GB" ? 'en' : 'ro'}`);
        const data = await response.json();
        const sortedReviews = data.reviews.sort((a, b) => b.time - a.time);
        setReviews(sortedReviews);
      } catch (error) {
        console.error(error);
        setReviews([]);
      }
      setLoading(false)
    };

    fetchReviews();
  }, [language]);

  console.log(reviews)

  const getTimeAgo = (timestamp) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeElapsed = currentTime - timestamp;
  
    if (timeElapsed < 60) {
      return `${timeElapsed} seconds ago`;
    } else if (timeElapsed < 3600) {
      const minutes = Math.floor(timeElapsed / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeElapsed < 86400) {
      const hours = Math.floor(timeElapsed / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeElapsed < 2592000) {
      const days = Math.floor(timeElapsed / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (timeElapsed < 31536000) {
      const months = Math.floor(timeElapsed / 2592000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(timeElapsed / 31536000);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };
  
  const getTotalRating = () => {
    let totalRating = 0
    for (const review of reviews){
      totalRating += review.rating
    }

    console.log(totalRating / reviews.length)
    return totalRating
  }

  getTotalRating();

  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
const wholeStars = Math.floor(averageRating);
const decimalPart = averageRating - wholeStars;

const ratingStars = Array.from({ length: wholeStars }, (_, index) => (
  <BsStarFill key={index} />
));

  return (
    <section className='reviewMain'>
      <div className='reviewMainHeader'>
        
        <h1>{language === "GB" ? 'Reviews' : "Recenzii"} ({reviews.length})</h1>
        <h2 className="review-source">
          {language === "GB" ? 'Reviews sourced from' : "Recenzii obtinute de la"}
          <span className="google-letter g"> G</span>
          <span className="google-letter o2">o</span>
          <span className="google-letter o">o</span>
          <span className="google-letter g">g</span>
          <span className="google-letter l">l</span>
          <span className="google-letter e">e</span>
        </h2>
      </div>

    {loading ? <Loading /> : 
    <>
    <div className='reviewsWidgetsWrapper'>
      <div className="reviewsWidgets">
        <div className='reviewsSpeechBubble'>
          <div class="speech-bubble">
          <Image src={logo} alt="googleLogo" className="googleLogo" height={30} width={30} />
          </div>

        <p>Google Reviews</p>
        </div>

         
        <div className="rating">
        {ratingStars}
      {decimalPart >= 0.5 && <BsStarHalf />}
      {decimalPart < 0.5 && decimalPart > 0 && <BsStarFill />}
      {Array.from({ length: 5 - Math.ceil(averageRating) }, (_, index) => (
        <BsStar key={index + wholeStars + 1} />
      ))}
    </div>

        <div>
          <span className='boldSpan'>{averageRating}</span> stars  <span className='boldSpan'>| {reviews.length}</span> reviews 
        </div>
      </div>
    </div>
    
    
    <div className="review-flex">
      
        {reviews.map((review, index) => (
        <div key={index} className="review">
                <Image src={review.profile_photo_url} alt="profilePhoto" width={40} height={40}/>
            
            <p className="rating">
            {Array.from({ length: review.rating }).map((index) => (
                <BsStarFill key={index} />
                ))}
                {Array.from({ length: 5 - review.rating }).map((index) => (
                <BsStar key={index} />
            ))}
            </p>
            {review.text && 
            <p style={{ textAlign: 'center'}}>{review.text}</p>
            }
                <h4>{review.author_name}</h4>
                <p>{getTimeAgo(review.time)}</p>
            {review.translated && <p className="translated">Translated.</p>}
        </div>
        ))}
    </div>
    </>
}
  </section>
  );
};

export default GoogleReviews;
