import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { db } from '../../../firebase-config'
import { collection, doc , getDoc, getDocs } from 'firebase/firestore'
import Header from '@/components/reusableComponents/Header'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import { Footer } from '@/components/reusableComponents/Footer'
import Image from 'next/image'
import DOMPurify from 'dompurify';
import Link from 'next/link'
import { BsSearch } from 'react-icons/bs'
import { motion,AnimatePresence } from 'framer-motion'

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
      
      if (monthA !== monthB) {
        return monthB - monthA;
      } else {
        return dayB - dayA;
      }
    });
    
    // Display the desired number of recent blogs (e.g., 3)
    const numberOfRecentBlogs = 3;
    const recentBlogs = blogs.slice(0, numberOfRecentBlogs);

    const [searchQuery, setSearchQuery] = useState('')

    const searchFilterMapBlogsRef = useRef();

    const filteredProducts = useMemo(() => {
      return blogs.filter((obj) => obj.titlu.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [blogs, searchQuery])

    useEffect(() => {
      const handleClickOutside = (event) => {
        if(
          searchFilterMapBlogsRef.current && 
          !searchFilterMapBlogsRef.current.contains(event.target)
        ) {
          setSearchQuery('')
        }
      };

      document.addEventListener('click', handleClickOutside)
      
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }, [])

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
              <input type='text' placeholder='Cauta Articol!'onChange={(e) => setSearchQuery(e.target.value)} className={searchQuery.length > 0 ? 'searchBarBlogsOpen' : 'searchBarBlogsClosed'}/>
              <BsSearch/>
                  <AnimatePresence>
        {searchQuery.length > 0 && (
          <motion.div
            className="searchFilterMapBlogs"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            ref={searchFilterMapBlogsRef}
          >
            {filteredProducts.length > 0 ? (

              filteredProducts.map((item) => {
                return(
                  <div key={item.id} className='blogSearchBarMap'>
                    <Image src={item.imageURL} alt='blogPhotoSearchSmall' width={70} height={70} />
                  
                  
                    <div>
                      <h4>{item.titlu}</h4>
                      
                      <p>{item.postDay} {item.postMonth}</p>
                    </div>
                </div>
                )})

            ) : <p>No items found.</p>}
          </motion.div>
        )}
          </AnimatePresence>
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
      
              
              <Link href='' className='littleBlogsDivTitleNData'>
                <h3>{obj.titlu}</h3>
                <p>{obj.postDay} {obj.postMonth}</p>
              </Link>
            </div>
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
