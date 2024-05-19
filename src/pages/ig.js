import React, { useEffect, useState } from 'react'

    export default function Ig() {

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
        code: 'AQBsUi9nYdweLMejOKKQmjCDkm0l03mmqO3bND0I2tsJ9maY3XRACK7ad69tLD-NY9LpLsH6kuPGSHZ8ZFnXau5TAdrAHGYwyw4cqh2TrDDGrQmVZl4O0nVUmrSUdjA5RYWQoeWOMIk8yPQ4s2LpzCWlWYslqhCZKYRWZvO3XWd6uPCnOuwDXMDdt7H0cqGRtz3yVz9L-s6OKSq_DWvO1YLVwK701nls-BJ2hLO32yJwJw'
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


const getLongLivedToken = async () => {

  try {
    const response = await fetch('/api/exchange-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken: 'IGQWRPVXAzTmlmNVFCSXczUEUzRmVxYlN1ZAVdJNXp3eEhxUlkxWnNPcThWWHJWbHBCZAE05dzVPOHIxMlhOQXBmaXRIbWF5XzMxU3VzS2ktWVdSZAmQxa1YzTGx1OV9PYVI1UnZAnRXI0R2tDb3hyZA25sMGhRZAGlUOVBYX0xibGxmd2NYUQZDZD' }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

  } catch (error) {
    console.log(error.message);
  }
};
///17950840439369029

const fetchInsightsForMediaItems = (mediaIds) => {
    // mediaIds.forEach(mediaId => {
      const mediaId = '18026449255434891';
      const accessToken = 'IGQWRPczFGUm5xQWhUY3A4WnhvNzFXTDdxVmdxZAWhVcE5pb3BPNzBiU1NzcDdLTmJFNWJWNTlXdVpLWkZARakppN2ZA3b2tmV1pYNUtkdUxmUUsza3dYcGREWkpEVUpzSVNlZAjBmbUwtLUd3QQZDZD';
        fetch(`https://graph.instagram.com/${mediaId}?fields=like_count&access_token=${accessToken}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error(`Error fetching insights for media ID :`, error));
};



const [igPosts, setIgPosts] = useState([])



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
      setIgPosts(data.mediaData)
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
  

  async function getMediaLikes() {
    const mediaId = '17950840439369029';
    const accessToken = 'IGQWRPczFGUm5xQWhUY3A4WnhvNzFXTDdxVmdxZAWhVcE5pb3BPNzBiU1NzcDdLTmJFNWJWNTlXdVpLWkZARakppN2ZA3b2tmV1pYNUtkdUxmUUsza3dYcGREWkpEVUpzSVNlZAjBmbUwtLUd3QQZDZD';
    
    const url = `https://graph.instagram.com/${mediaId}?fields=id,media_type,media_url,username,timestamp,like_count&access_token=${accessToken}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Media Data:', data);
      return data.like_count;
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  }
  
  // Usage example:

  
  

  // const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();
  // const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed
  // const startOfMonth = new Date(currentYear, currentMonth - 1, 1); // Start of current month
  // const startOfMonthUnix = Math.floor(startOfMonth.getTime() / 1000); // Unix timestamp for start of current month

  // // Determine the number of days in the previous month
  // const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();

  // console.log(daysInPreviousMonth)

  // // Subtract one month's worth of seconds from the current timestamp
  // const oneMonthAgoUnix = startOfMonthUnix - (daysInPreviousMonth * 24 * 60 * 60);

  // console.log("Start of current month:", startOfMonth);
  // console.log("Unix timestamp for start of current month:", startOfMonthUnix);
  // console.log("Unix timestamp for one month ago:", oneMonthAgoUnix);

  // const [likes,setTotalLikes] = useState(0)
  // const [comments,setTotalComments] = useState(0)

  const comments = []
  const likes = []
  const fetchLikeCount = async () => {
    try {
      const response = await fetch('https://graph.instagram.com/me/media?fields=id,caption,media_type,permalink,timestamp&access_token=IGQWRPczFGUm5xQWhUY3A4WnhvNzFXTDdxVmdxZAWhVcE5pb3BPNzBiU1NzcDdLTmJFNWJWNTlXdVpLWkZARakppN2ZA3b2tmV1pYNUtkdUxmUUsza3dYcGREWkpEVUpzSVNlZAjBmbUwtLUd3QQZDZD');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      
      const currentDate = new Date();

      const oneMonthAgo = new Date(currentDate);
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);
      
      const iso8601DateOneMonthAgo = oneMonthAgo.toISOString();
      const data = await response.json();

      setIgPosts(data.data)

      if(iso8601DateOneMonthAgo > data.data[24].timestamp){
        fetchNextData(`${data.paging.next}`)
      }

    } catch (error) {
      console.error('There was a problem fetching media items:', error);
    }
  };

  const fetchNextData = async (link) => {
    try{
      const response = await fetch(link)
      if(!response.ok){
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setIgPosts(prevState => [...prevState, ...data.data])
    } catch (e){
      console.error("Error claiming next", e)
    }
  }

  console.log(igPosts)

  
  useEffect(() => {
    fetchLikeCount();
    // console.log(igPosts)
  }, [])
  
  // useEffect(() => {
  //   if (igPosts && igPosts.data) {
  //     const fetchData = async () => {
  //       try {
  //         const fetchPromises = igPosts.data.map(async (item) => {
  //           try {
  //             const response = await fetch(`/api/fetchMediaInfo?url=${item.permalink}&timestamp=${item.timestamp}`);
  //             const data = await response.json();
  
  //             if (response.ok) {
                
  //               if(data.likeCount === 0){
  //                 return;
  //               } else {
  //                 likes.push(data.likeCount)
                  
  //               };

  //               if(data.commentCount === 0){
  //                 return;
  //               } else {
  //                 comments.push(data.commentCount)
  //               };

  //               console.log(likes);

  //               const totalComments = comments.reduce((acc, curr) => acc + curr, 0);
  //               console.log("Total comments:", totalComments);

  //               const totalLikes = likes.reduce((acc, curr) => acc + curr, 0);
  //               console.log("Total likes:", totalLikes);

  //             } else {
  //               console.log(data.error);
  //             }
  //           } catch (perItemError) {
  //             console.log('An unexpected error occurred.', perItemError);
  //           }
  //         });
  
  //         await Promise.all(fetchPromises);
  //       } catch (mainError) {
  //         console.log("An unexpected problem occurred.", mainError);
  //       }
  //     };
  
  //     fetchData();
  //   }
  // }, [igPosts]);

  const fetchMediaItems = async () => {
    try {
      const response = await fetch('https://graph.instagram.com/me/media?fields=id,caption,media_type,permalink,timestamp&access_token=IGQWRPczFGUm5xQWhUY3A4WnhvNzFXTDdxVmdxZAWhVcE5pb3BPNzBiU1NzcDdLTmJFNWJWNTlXdVpLWkZARakppN2ZA3b2tmV1pYNUtkdUxmUUsza3dYcGREWkpEVUpzSVNlZAjBmbUwtLUd3QQZDZD');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setIgPosts(data)
      console.log(igPosts)

    } catch (error) {
      console.error('There was a problem fetching media items:', error);
    }
  };

  const totalComments = comments.reduce((acc,prev) => acc+prev, 0)
  const totalLikes = likes.reduce((acc,prev) => acc+prev, 0)

  return (
        <div>
          <button onClick={exchangeCodeForToken}>Login Instagram!</button>

          <button onClick={fetchMediaItems}>Fetch Media!</button>

          <button onClick={getLongLivedToken}>Long Live Access!</button>

          <button onClick={getMediaLikes}>Get Likes of Post!</button>

          <button onClick={fetchLikeCount}>Whole Like Count! GB</button>

          <button onClick={handleLogin}>Login.?</button>

        </div>
    )
    }
