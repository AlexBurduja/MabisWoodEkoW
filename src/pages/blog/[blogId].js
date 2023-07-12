import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase-config'
import { collection, doc , getDoc, getDocs } from 'firebase/firestore'
import Header from '@/components/reusableComponents/Header'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import { Footer } from '@/components/reusableComponents/Footer'
import Image from 'next/image'
import DOMPurify from 'dompurify';
import Link from 'next/link'
import { BsSearch } from 'react-icons/bs'

function BlogId() {
    const router = useRouter()
    const { blogId } = router.query

    const [blog, setBlog] = useState([])
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
      
      const getDocuments = async () => {
        if(blogId){
            const docRef = doc(db, `blog/${blogId}`)
            const data = await getDoc(docRef);
            setBlog(data.data())
        }
      }

      
        getDocuments();
      

        const getBlogs = async () => {
    
          const ref = collection(db,'blog')
          const data = await getDocs(ref);
          setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
  
      getBlogs();
    }, [blogId])

    function HtmlRenderer({ htmlString }) {
      const sanitizedHtml = DOMPurify.sanitize(htmlString);
      return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
    }

    const d = new Date()
    const dateNow = d.getDate() - 3

    console.log(dateNow)


    blogs.sort((a, b) => {
      // Extract the numeric day from the postDay string
      const dayA = parseInt(a.postDay);
      const dayB = parseInt(b.postDay);
      
      // Convert the postMonth strings to month numbers for comparison
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const monthA = monthNames.indexOf(a.postMonth);
      const monthB = monthNames.indexOf(b.postMonth);
      
      // Compare the month and day values
      if (monthA !== monthB) {
        return monthB - monthA; // Sort by month in descending order
      } else {
        return dayB - dayA; // Sort by day in descending order
      }
    });
    
    // Display the desired number of recent blogs (e.g., 3)
    const numberOfRecentBlogs = 3;
    const recentBlogs = blogs.slice(0, numberOfRecentBlogs);

  return (
    <>
    <TopScrollProgress/>
    <Header/>

    <section className='blogAndArticleWrapper'>

      <div className='blogContent'>
        <div className='titleAndAuthorContent'>
          
          <div className='blogFilterWrapperIdPage'>
              <p>BLOG</p>
            </div>
          
          <h1>{blog.titlu}</h1>
          <p>Postat de <span style={{fontWeight: 'bold', fontSize:'18px'}}>{blog.autor}</span></p>
        </div>

        <div className='imageDivBlog'>   
          <div className='mainBlogPhotoDiv' >
          
            <Image src={blog.imageURL} alt="Preview" fill="fill"  style={{ objectFit: 'cover', objectPosition: 'center' }} />

          </div>

          <div className='datesBlog'>
              <div>{blog.postDay}</div>
              <div>{blog.postMonth}</div>
          </div>
        </div>

        <div className='blogText'>
          {blogId && 
          <HtmlRenderer htmlString={blog.text} />
          }
        </div>
      </div>

        <div className='articleListAndFinder'>
          <div className='littleBlogsSearch'>
            <p>Cauta Articol...</p>
            <div className='littleBlogsSearchInputDiv'>
              <input type='text' placeholder='Cauta Articol!'/>
              <BsSearch/>
            </div>
          </div>

          <div className='littleBlogsNavigation'>
            <p>Navigare</p>
          
            <Link href={'/'}>Acasa</Link>
            <Link href={'/peleti'}>Peleti</Link>
            <Link href={'/brichete'}>Brichete</Link>
            <Link href={'/rumegus'}>Rumegus</Link>
            <Link href={'/tocatura'}>Tocatura</Link>
          </div>
        
          <p>Postari Recente</p>
        {recentBlogs.map((obj) => {
        return (
          <section key={obj.id} className='littleBlogsDivWrapper'>
            <div className='littleBlogsDiv'>
              <Image src={obj.imageURL} width={70} height={70} alt='smallBlogPhoto'/>
      
              
              <div className='littleBlogsDivTitleNData'>
                <h3>{obj.titlu}</h3>
                <p>{obj.postDay} {obj.postMonth}</p>
              </div>
            </div>

            {/* <div className='littleBlogsDivData'>
              <p>{obj.postDay} {obj.postMonth}</p>
            </div> */}
          </section>
        )
      })}
      </div>
    </section>

    <Footer/>


    </>
  )
}

export default BlogId
