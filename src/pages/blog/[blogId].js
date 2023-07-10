import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config'
import { doc , getDoc } from 'firebase/firestore'
import Header from '@/components/reusableComponents/Header'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import { Footer } from '@/components/reusableComponents/Footer'
import Image from 'next/image'
import DOMPurify from 'dompurify';

function BlogId() {
    const router = useRouter()
    const { blogId } = router.query

    const [blog, setBlog] = useState([])

    useEffect(() => {
      
      const getDocuments = async () => {
        if(blogId){
            const docRef = doc(db, `blog/${blogId}`)
            const data = await getDoc(docRef);
            setBlog(data.data())
        }
      }

      getDocuments();
    }, [blogId])

    function HtmlRenderer({ htmlString }) {
      const sanitizedHtml = DOMPurify.sanitize(htmlString);
      return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
    }


  return (
    <>
    <TopScrollProgress/>
    <Header/>

    <section className='blogAndArticleWrapper'>

      <div className='blogContent'>
        <div>
          <h1>{blog.titlu}</h1>
          <p>Postat de <span style={{fontWeight: 'bold', fontSize:'18px'}}>{blog.autor}</span></p>
        </div>

        <div className='imageDivBlog'>   
          <div style={{ width: '600px', height: '600px', position: 'relative' }}>
          
            <Image src={blog.imageURL} alt="Preview" fill="fill"  style={{ objectFit: 'cover', objectPosition: 'center' }} />

          </div>

          <div className='datesBlog'>
              <div>{blog.postDay}</div>
              <div>{blog.postMonth}</div>
          </div>
        </div>

        <div>
          <HtmlRenderer htmlString={blog.text} />
        </div>
      </div>

      <div className='articleListAndFinder'>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
        <p>BlogList</p>
      </div>
    </section>

    <Footer/>


    </>
  )
}

export default BlogId
