import React from "react"
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";


export function ReviewPageComponent(props) {

    const { reviewTitle, reviewText, rating, firstName, lastName, time, id  } = props

function deleteHandler(id) {
  deleteDoc(doc(db, 'reviews', id))  
}


function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<RiStarFill />);
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(<RiStarLine />);
    }
    return stars;
  }


    return(
        <>
        
            
      <section className="reviewRatingSection">

        <div className="reviewRatingSection_username">
          <p>
            {lastName + " " + firstName?.substring(0,1) + ". "} { localStorage.getItem('language') === 'FR' ? <span>a dit</span>
                  : localStorage.getItem('language') === 'GB' ? <span>said</span>
                  : localStorage.getItem('language') === 'RO' ? <span>a spus</span>
                  : localStorage.getItem('language') === 'DE' ? <span>sagte</span>
                  : localStorage.getItem('language') === 'IT' ? <span>ha detto</span>
                  : <span>said</span> } 
          </p> 
        </div>
        
        <div className="reviewRatingSection_title">
          {reviewTitle}
        </div>
  
        <div className="reviewRatingSection_text">
          {reviewText}    
        </div>
  
        <div className="reviewRatingSection_stars">
          {renderStars(rating)}
        </div>
  
        <div className="reviewRatingSection_time">
          {
            localStorage.getItem('language') === 'FR' ? <p>Soumis à : {time}</p>
            : localStorage.getItem('language') === 'GB' ? <p>Submitted at: {time}</p>
            : localStorage.getItem('language') === 'RO' ? <p>Înaintat la: {time}</p>
            : localStorage.getItem('language') === 'DE' ? <p>Eingereicht am: {time}</p>
            : localStorage.getItem('language') === 'IT' ? <p>Inviato il: {time}</p>
            : <p>Submitted at: {time}</p>
          }
          
        </div>
  
        <button className="reviewDeleteButton" onClick={() => deleteHandler(id)}>
          <AiOutlineClose />
        </button>

      </section>
        </>
    )
}