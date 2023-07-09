import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config'
import { doc , getDoc } from 'firebase/firestore'

function BlogId() {
    const router = useRouter()
    const { blogId } = router.query

    const [blog, setBlog] = useState()

    useEffect(() => {
      
      const getDocuments = async () => {
        if(blogId){
            const docRef = doc(db, `blog/${blogId}`)
            const data = await getDoc(docRef);
            setBlog(data.data()); 
        }
      }

      getDocuments();
    }, [blogId])


    console.log(typeof blog)

  return (
    <>
      {/* {blog.map((obj,index) => {
        return(
          <div key={index}>

        <p>{obj.titlu}</p>
        
          </div>
        )
      })} */}
    </>
  )
}

export default BlogId
