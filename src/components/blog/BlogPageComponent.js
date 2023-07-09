import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../firebase-config'
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { FirebaseAuthContext } from '../../../FirebaseAuthContext';

function BlogPageComponent() {
    const [blogs, setBlogs] = useState([])
    const { conditional } = useContext(FirebaseAuthContext)

    useEffect(() => {
        const getBlogs = async () => {
    
            const ref = collection(db,'blog')
            const data = await getDocs(ref);
            setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
    
        getBlogs();
    }, [])

    function HtmlRenderer({ htmlString }) {
        const sanitizedHtml = DOMPurify.sanitize(htmlString);
        return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
      }

      function trimTitle(title) {
        const slug = title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-').trim();
        return slug;
      }

    return (    
    <div>
        {conditional.admin && 
        <div className='createBlogWrapper'>
            <Link className='createBlogLink' href={'/createBlog'}>Create Blog</Link>
        </div>
        }
        
        <div className='blogs-container'>
            {blogs.map((obj,index) =>{
          return(
          <div key={index} className='blogItem'>

                <div className='imageDivBlog'>
                
                <div style={{ width: '300px', height: '300px', position: 'relative' }}>
                <Image src={obj.imageURL} alt="Preview" fill="fill"  style={{ objectFit: 'cover', objectPosition: 'center' }} />
                </div>

                <div className='datesBlog'>
                    <div>{obj.postDay}</div>
                    <div>{obj.postMonth}</div>
                </div>
                
                <div className='blogFilterWrapper'>
            <p className='blogFilter'>BLOG</p>
                </div>

            </div>


                <div className='titluSiAutorBlog'>
                    <h2>{obj.titlu}</h2>
                    <p>Postat de <span>{obj.autor}</span></p>
                </div>

                <div style={{width: '300px', textAlign: 'center'}}>
                    <HtmlRenderer htmlString={obj.text.length > 400 ? obj.text.slice(0,200) + '...' : obj.text} />
                </div>

            <Link href={`blog/${trimTitle(obj.titlu)}`}>CITESTE MAI MULT...</Link>
          </div>
          )
        })}
        </div>
    </div>
  )
}

export default BlogPageComponent
