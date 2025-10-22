import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import logo from '../../publicResources/google-logo-9808.png'

function GoogleReviewWidget() {
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

    const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
const wholeStars = Math.floor(averageRating);
const decimalPart = averageRating - wholeStars;

const ratingStars = Array.from({ length: wholeStars }, (_, index) => (
  <BsStarFill key={index} />
));

const [hover, setHover] = useState(false)

function hoverr(){
    setHover(!hover)
}


  return (
    <div className='reviewsWidgetsWrapper' >
      <div className="reviewsWidgets" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
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
          <span className='boldSpan'>{averageRating.toFixed(1)}</span> stars  <span className='boldSpan'>| {reviews.length}</span> reviews 
        </div>
      </div>
      </div>
  )
}

export default GoogleReviewWidget
