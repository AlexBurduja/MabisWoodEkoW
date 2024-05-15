import React, { useEffect, useState } from 'react'

    export default function ig() {

          ///code: 
  ///AQDo6a9ZxyHuYLbzIWYZZ3JuZsSDW8MlwpirpV8TzWdWXihPbO-WbDDz_44J0LMW4ymnFrW89Rt7s3x1JPTRy77QZ6jCMb3KjcwOsAaWuuMr8c6gBY1trYmSolLhgmwXx5rcJmhgsvj8Z5PQJ7xKmNDEN_TTx89resfAFpI8C5zGtXHPMdZofrrrVugdbHwWkA5Znqoc15PY4-YIRwyJ4ntwyf0Pqor6F9TNIkhj4V5Eug

  ///ig app id:
  ///822508686597578

  ///ig app secret:
  ///375f3282b89aebc5e85cae3df69efc6f

  ///redirect uri
  ///https://www.mabiswoodeko.vercel.app/login

//   curl -X POST \
//   https://api.instagram.com/oauth/access_token \
//   -F client_id=822508686597578 \
//   -F client_secret=375f3282b89aebc5e85cae3df69efc6f \
//   -F grant_type=authorization_code \
//   -F redirect_uri=https://www.mabiswoodeko.vercel.app/login \
//   -F code=AQDo6a9ZxyHuYLbzIWYZZ3JuZsSDW8MlwpirpV8TzWdWXihPbO-WbDDz_44J0LMW4ymnFrW89Rt7s3x1JPTRy77QZ6jCMb3KjcwOsAaWuuMr8c6gBY1trYmSolLhgmwXx5rcJmhgsvj8Z5PQJ7xKmNDEN_TTx89resfAFpI8C5zGtXHPMdZofrrrVugdbHwWkA5Znqoc15PY4-YIRwyJ4ntwyf0Pqor6F9TNIkhj4V5Eug
        
// const exchangeCodeForToken = () => {
//     fetch('https://api.instagram.com/oauth/access_token', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({
//         client_id: '822508686597578',
//         client_secret: '375f3282b89aebc5e85cae3df69efc6f',
//         grant_type: 'authorization_code',
//         redirect_uri: 'https://mabiswoodeko.vercel.app/login',
//         code: 'AQAeueTewK4i8UjS-smUCeGKfpBj4o4MFBkdudZr1LvZeN5Au4GZ6I05oA5bic8yIUhP2dpJiP3CBqvi0nw4Pr4bXhS5KLxsX9yQPSI2iM8vCEzs6Xwzu244qNDLQIgEZdr3MZqYo6xFks130RpvqihdizJCXH3qd_V2z2jaXxeCnmB0gDwNcGciim8O4-sKXYaAIPpLMbNzhpZwjjOFo-35s_ipjSjMndrZs7K6lsR6SA'
//     })
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// })
// .then(data => {
//     console.log(data); // Handle the response data here
// })
// .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
// });

// };


// const fetchMediaItems = () => {
//     fetch('https://graph.instagram.com/me/media?fields=id,caption,media_type&access_token=IGQWRPTE5QZATZAxczhBVjhrYU1GbFowZA1dRT2xjTExOejF3Y1ZANOENyYm5LaFJmWHM3YU94LUhXTU9ka21FSkdranV6TFRrdV9hZA3piX3pPQ2pweVR1UmFYblBGVDJEejk4Y1g4YXlkcjd2c1cwaTVSaUk1R09id1pGUHBYV3Vib2hqZAwZDZD')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data.data);
//         // fetchInsightsForMediaItems(mediaIds);
//     })
//     .catch(error => {
//         console.error('There was a problem fetching media items:', error);
//     });
// }

// function longLiveAccessToken(){
//   fetch("https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=375f3282b89aebc5e85cae3df69efc6f&access_token=AQB57afPHlptPp17FsoK6H3ZB8eTeSara0SC6RMegoqD83t_kRsWkLb8FGbhj-C2pd2Y0euJDsD9e3k4v3DO2JR0hU-mMLhyyVnw3xqpe8YHzaghFpcKbwP9O4WvqBdWPofidtJ49xhOzOwhowKe_fNk2fnHGS5ApQj1g0mem-vj8KO9GkMcHB8YycBuqLr3duV9CMzdeA-mW1NAEVPeosF9K0FXlDlTE8Rnp1QLuZa5Uw")
//   .then((response) => console.log('Response:',response.json()))
//   .then((data) => console.log('Data:', data))
//   .catch((error) => console.log("Error:", error))
// } 
// ///17950840439369029

// const fetchInsightsForMediaItems = (mediaIds) => {
//     // mediaIds.forEach(mediaId => {
//       const mediaId = '18026449255434891';
//       const accessToken = 'IGQWRPTE5QZATZAxczhBVjhrYU1GbFowZA1dRT2xjTExOejF3Y1ZANOENyYm5LaFJmWHM3YU94LUhXTU9ka21FSkdranV6TFRrdV9hZA3piX3pPQ2pweVR1UmFYblBGVDJEejk4Y1g4YXlkcjd2c1cwaTVSaUk1R09id1pGUHBYV3Vib2hqZAwZDZD';
//         fetch(`https://graph.instagram.com/${mediaId}?fields=like_count&access_token=${accessToken}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//         })
//         .catch(error => console.error(`Error fetching insights for media ID :`, error));
// };



// const FacebookLoginButton = () => {
//     useEffect(() => {
//       // This function checks the login status when the component mounts
//       const checkLoginState = () => {
//         FB.getLoginStatus(function(response) {
//           statusChangeCallback(response);
//         });
//       };
  
//       // Attach the function to the window object so it can be called from the FB login button
//       window.checkLoginState = checkLoginState;
  
//       // Cleanup function to remove the function from the window object when the component unmounts
//       return () => {
//         delete window.checkLoginState;
//       };
//     }, []);
  
//     const statusChangeCallback = (response) => {
//       // Handle login status change here
//       console.log(response);
//     };
  
//     const handleLoginClick = () => {
//       // Call FB.login when the button is clicked
//       FB.login(function(response) {
//         statusChangeCallback(response);
//       }, { scope: 'public_profile,email,instagram_manage_insights,instagram_basic' });
//     };
  
//     return (
//       <div onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
//         Facebook Login
//       </div>
//     );
//   };

  const [posts, setPosts] = useState([])

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/instagramLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: '_justAlexo', password: 'Alexandru10002!'}),
      });
      const data = await response.json();
      setPosts(data.mediaData)
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };
  
  const array = [
    {
      'mediaId': "2960381948990385430_48342578676",
      'totalLikes': 12,
      'totalComments': 0,
      'dateTaken': 1667125050
    },
    {
        "mediaId": "2996235830991750578_48342578676",
        "totalLikes": 19,
        "totalComments": 0,
        "dateTaken": 1713312000
    },
    {
      "totalLikes": 5,
      "dateTaken": 1713398400
    },
    {
      "totalLikes": 5,
      "dateTaken": 1713657600
    },
  ]

  // array.forEach((item) => {
  //   console.log(unixTime - 2592000)
    
  // });
  const time = new Date();
  const unixTimeNow = Math.floor(time.getTime() / 1000)

  console.log(unixTimeNow)
  
  const timedArray = array.filter((item) => { 
    return item.dateTaken < unixTimeNow && item.dateTaken > unixTimeNow - 2592000;
  })

  console.log(new Date(1713199023 * 1000).toDateString())
  
  useEffect(() => {
    if(posts){
      const finalData = posts.filter((item) => {
        return item.dateTaken < 1694531029 && item.dateTaken > 1620227029;
      });

      console.log(finalData);
    }


  }, [posts])
  

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed
  const startOfMonth = new Date(currentYear, currentMonth - 1, 1); // Start of current month
  const startOfMonthUnix = Math.floor(startOfMonth.getTime() / 1000); // Unix timestamp for start of current month

  // Determine the number of days in the previous month
  const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();

  console.log(daysInPreviousMonth)

  // Subtract one month's worth of seconds from the current timestamp
  const oneMonthAgoUnix = startOfMonthUnix - (daysInPreviousMonth * 24 * 60 * 60);

  console.log("Start of current month:", startOfMonth);
  console.log("Unix timestamp for start of current month:", startOfMonthUnix);
  console.log("Unix timestamp for one month ago:", oneMonthAgoUnix);

        return (
        <div>
          <button onClick={handleLogin}>Login.?</button>

        </div>
    )
    }
