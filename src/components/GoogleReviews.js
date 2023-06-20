import Image from 'next/image';
import { useState, useEffect } from 'react';
import { RiStarSFill, RiStarSLine } from 'react-icons/ri';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);

  const [language, setLanguage] = useState("GB")

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
        setLanguage(storedLanguage);
      }
  }, [])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/getReviews?language=${language === "GB" ? 'en' : 'ro'}`);
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error(error);
        setReviews([]);
      }
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
  

  return (
    <section className='reviewMain'>
    <h1>Reviews</h1>
    <div className="review-flex">
        {reviews.map((review, index) => (
        <div key={index} className="review">
                <Image src={review.profile_photo_url} alt="profilePhoto" width={40} height={40}/>
            <p className="rating">
            {Array.from({ length: review.rating }).map((index) => (
                <RiStarSFill key={index} />
                ))}
                {Array.from({ length: 5 - review.rating }).map((index) => (
                <RiStarSLine key={index} />
            ))}
            </p>
            {review.text && 
            <p>{review.text}</p>
            }
                <h4>{review.author_name}</h4>
                <p>{getTimeAgo(review.time)}</p>
            {review.translated && <p className="translated">Translated.</p>}
        </div>
        ))}
    </div>
  </section>
  );
};

export default GoogleReviews;
