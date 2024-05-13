    import React from 'react'

    export default function ig() {

          ///code: 
  ///AQDo6a9ZxyHuYLbzIWYZZ3JuZsSDW8MlwpirpV8TzWdWXihPbO-WbDDz_44J0LMW4ymnFrW89Rt7s3x1JPTRy77QZ6jCMb3KjcwOsAaWuuMr8c6gBY1trYmSolLhgmwXx5rcJmhgsvj8Z5PQJ7xKmNDEN_TTx89resfAFpI8C5zGtXHPMdZofrrrVugdbHwWkA5Znqoc15PY4-YIRwyJ4ntwyf0Pqor6F9TNIkhj4V5Eug

  ///ig app id:
  ///822508686597578

  ///ig app secret:
  ///375f3282b89aebc5e85cae3df69efc6f

  ///redirect uri
  ///https://www.mabiswoodeko.vercel.app/login
        
        const fetchAccessToken = async () => {
            const clientId = '822508686597578';
            const clientSecret = '375f3282b89aebc5e85cae3df69efc6f';
            const redirectUri = 'https://www.mabiswoodeko.vercel.app/login';
            const code = 'AQDo6a9ZxyHuYLbzIWYZZ3JuZsSDW8MlwpirpV8TzWdWXihPbO-WbDDz_44J0LMW4ymnFrW89Rt7s3x1JPTRy77QZ6jCMb3KjcwOsAaWuuMr8c6gBY1trYmSolLhgmwXx5rcJmhgsvj8Z5PQJ7xKmNDEN_TTx89resfAFpI8C5zGtXHPMdZofrrrVugdbHwWkA5Znqoc15PY4-YIRwyJ4ntwyf0Pqor6F9TNIkhj4V5Eug';
    
            try {
                const response = await fetch('https://api.instagram.com/oauth/access_token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        client_id: clientId,
                        client_secret: clientSecret,
                        grant_type: 'authorization_code',
                        redirect_uri: redirectUri,
                        code: code
                    })
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Handle the response data here
                } else {
                    console.error('Failed to fetch access token');
                }
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };
        

        return (
        <div>
        <button onClick={fetchAccessToken}>Please..?</button>
        </div>
    )
    }
