import BlogPageComponent from '@/components/blog/BlogPageComponent'
import { Footer } from '@/components/reusableComponents/Footer'
import Header from '@/components/reusableComponents/Header'
import TopScrollProgress from '@/components/reusableComponents/TopScrollProgress'
import React from 'react'

function Blog() {
  return (
    <>
        <TopScrollProgress/>
        <Header />
        <BlogPageComponent />
        <Footer/>
    </>
  )
}

export default Blog
