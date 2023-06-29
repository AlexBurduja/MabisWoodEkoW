import Image from 'next/image';
import { useState, useEffect } from 'react';
import Loading from './reusableComponents/Loading';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import GoogleReviewWidget from './reviewPage/GoogleReviewWidget';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState("GB")

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
    <GoogleReviewWidget />
    
    
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
