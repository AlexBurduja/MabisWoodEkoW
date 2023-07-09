import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config'
import DOMPurify from 'dompurify';
import Image from 'next/image';

function BlogPageComponent() {
    const [blogs, setBlogs] = useState([])
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

    return (    
    <div>
      <Link href={'/createBlog'}>Create Blog</Link>
        
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
            
            <div className='titluSiAutorBlog'>
                <h1>{obj.titlu}</h1>
                <p>Postat de <span style={{ fontSize: '18px', fontWeight: 'bold'}}>{obj.autor}</span></p>
            </div>
                <div style={{width: '300px'}}>
                    <HtmlRenderer htmlString={obj.text.length > 400 ? obj.text.slice(0,200) + '...' : obj.text} />
                </div>
            </div>
          </div>
          )
        })}
        </div>
    </div>
  )
}

export default BlogPageComponent
