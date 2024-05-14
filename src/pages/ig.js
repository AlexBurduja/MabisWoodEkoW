import React, { useEffect } from 'react'

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
        
const exchangeCodeForToken = () => {
    fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        client_id: '822508686597578',
        client_secret: '375f3282b89aebc5e85cae3df69efc6f',
        grant_type: 'authorization_code',
        redirect_uri: 'https://mabiswoodeko.vercel.app/login',
        code: 'AQAeueTewK4i8UjS-smUCeGKfpBj4o4MFBkdudZr1LvZeN5Au4GZ6I05oA5bic8yIUhP2dpJiP3CBqvi0nw4Pr4bXhS5KLxsX9yQPSI2iM8vCEzs6Xwzu244qNDLQIgEZdr3MZqYo6xFks130RpvqihdizJCXH3qd_V2z2jaXxeCnmB0gDwNcGciim8O4-sKXYaAIPpLMbNzhpZwjjOFo-35s_ipjSjMndrZs7K6lsR6SA'
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log(data); // Handle the response data here
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

};


const fetchMediaItems = () => {
    fetch('https://graph.instagram.com/me/media?fields=id,caption,media_type&access_token=IGQWRPTE5QZATZAxczhBVjhrYU1GbFowZA1dRT2xjTExOejF3Y1ZANOENyYm5LaFJmWHM3YU94LUhXTU9ka21FSkdranV6TFRrdV9hZA3piX3pPQ2pweVR1UmFYblBGVDJEejk4Y1g4YXlkcjd2c1cwaTVSaUk1R09id1pGUHBYV3Vib2hqZAwZDZD')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.data);
        // fetchInsightsForMediaItems(mediaIds);
    })
    .catch(error => {
        console.error('There was a problem fetching media items:', error);
    });
}

function longLiveAccessToken(){
  fetch("https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=375f3282b89aebc5e85cae3df69efc6f&access_token=AQB57afPHlptPp17FsoK6H3ZB8eTeSara0SC6RMegoqD83t_kRsWkLb8FGbhj-C2pd2Y0euJDsD9e3k4v3DO2JR0hU-mMLhyyVnw3xqpe8YHzaghFpcKbwP9O4WvqBdWPofidtJ49xhOzOwhowKe_fNk2fnHGS5ApQj1g0mem-vj8KO9GkMcHB8YycBuqLr3duV9CMzdeA-mW1NAEVPeosF9K0FXlDlTE8Rnp1QLuZa5Uw")
  .then((response) => console.log('Response:',response.json()))
  .then((data) => console.log('Data:', data))
  .catch((error) => console.log("Error:", error))
} 
///17950840439369029

const fetchInsightsForMediaItems = (mediaIds) => {
    // mediaIds.forEach(mediaId => {
      const mediaId = '18026449255434891';
      const accessToken = 'IGQWRPTE5QZATZAxczhBVjhrYU1GbFowZA1dRT2xjTExOejF3Y1ZANOENyYm5LaFJmWHM3YU94LUhXTU9ka21FSkdranV6TFRrdV9hZA3piX3pPQ2pweVR1UmFYblBGVDJEejk4Y1g4YXlkcjd2c1cwaTVSaUk1R09id1pGUHBYV3Vib2hqZAwZDZD';
        fetch(`https://graph.instagram.com/${mediaId}?fields=like_count&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error(`Error fetching insights for media ID :`, error));
};



const FacebookLoginButton = () => {
    useEffect(() => {
      // This function checks the login status when the component mounts
      const checkLoginState = () => {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      };
  
      // Attach the function to the window object so it can be called from the FB login button
      window.checkLoginState = checkLoginState;
  
      // Cleanup function to remove the function from the window object when the component unmounts
      return () => {
        delete window.checkLoginState;
      };
    }, []);
  
    const statusChangeCallback = (response) => {
      // Handle login status change here
      console.log(response);
    };
  
    const handleLoginClick = () => {
      // Call FB.login when the button is clicked
      FB.login(function(response) {
        statusChangeCallback(response);
      }, { scope: 'public_profile,email,instagram_manage_insights,instagram_basic' });
    };
  
    return (
      <div onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
        Facebook Login
      </div>
    );
  };

  
  const handleLogin = async () => {
    try {
      const response = await fetch('/api/instagramLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: 'magic._.candles', password: 'Atis2004!', mediaId: '17974269685782059'}),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };


  

        return (
        <div>
        <button onClick={longLiveAccessToken}>Please..?</button>
        <button onClick={fetchMediaItems}>Get media?!</button>
        <button onClick={fetchInsightsForMediaItems}>Get likes?!</button>
        <button onClick={handleLogin}>Login.?</button>

        <FacebookLoginButton />
        </div>
    )
    }
