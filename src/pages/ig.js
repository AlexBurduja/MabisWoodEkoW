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

//   curl -X POST \
//   https://api.instagram.com/oauth/access_token \
//   -F client_id=822508686597578 \
//   -F client_secret=375f3282b89aebc5e85cae3df69efc6f \
//   -F grant_type=authorization_code \
//   -F redirect_uri=https://www.mabiswoodeko.vercel.app/login \
//   -F code=AQDo6a9ZxyHuYLbzIWYZZ3JuZsSDW8MlwpirpV8TzWdWXihPbO-WbDDz_44J0LMW4ymnFrW89Rt7s3x1JPTRy77QZ6jCMb3KjcwOsAaWuuMr8c6gBY1trYmSolLhgmwXx5rcJmhgsvj8Z5PQJ7xKmNDEN_TTx89resfAFpI8C5zGtXHPMdZofrrrVugdbHwWkA5Znqoc15PY4-YIRwyJ4ntwyf0Pqor6F9TNIkhj4V5Eug
        
        const fetchAccessToken = async () => {
            const body = new FormData
            body.append("client_id", "822508686597578")
            body.append("", "\\")
            body.append("client_secret", "375f3282b89aebc5e85cae3df69efc6f")
            body.append("", "\\")
            body.append("grant_type", "authorization_code")
            body.append("", "\\")
            body.append("redirect_uri", "https://www.mabiswoodeko.vercel.app/login")
            body.append("", "\\")
            body.append("code", "AQDo6a9ZxyHuYLbzIWYZZ3JuZsSDW8MlwpirpV8TzWdWXihPbO-WbDDz_44J0LMW4ymnFrW89Rt7s3x1JPTRy77QZ6jCMb3KjcwOsAaWuuMr8c6gBY1trYmSolLhgmwXx5rcJmhgsvj8Z5PQJ7xKmNDEN_TTx89resfAFpI8C5zGtXHPMdZofrrrVugdbHwWkA5Znqoc15PY4-YIRwyJ4ntwyf0Pqor6F9TNIkhj4V5Eug")
            
            fetch("https://api.instagram.com/oauth/access_token", {
              body,
              headers: {
                "Content-Type": "multipart/form-data"
              },
              method: "POST"
            })
        };
        

        return (
        <div>
        <button onClick={fetchAccessToken}>Please..?</button>
        </div>
    )
    }
