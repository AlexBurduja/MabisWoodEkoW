import { useState, useEffect } from 'react';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const placeId = 'ChIJM_cvQl-TskARjkRh2NmgQ6I'; // Replace with your Google My Business place ID
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJM_cvQl-TskARjkRh2NmgQ6I&fields=reviews&key=AIzaSyBoQfvBoQIBv3PogXlCpH67LWePQ_ttBCo`
      );
      const data = await response.json();
      console.log(data.result);
    };

    fetchReviews();
  }, []);

  return (
    <div>
        {
      reviews ?
      reviews.map((review, index) => (
        <div key={index} className="review">
          <h4>{review.author_name}</h4>
          <p>{review.text}</p>
        </div>
      ))
      :
      <p>No reviews</p>
}
    </div>
  );
};

export default GoogleReviews;
