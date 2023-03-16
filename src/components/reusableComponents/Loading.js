import Image from 'next/image'
import React from 'react'
// import "./Loading.css"
import logo  from "../../publicResources/logoMabisCerc.svg"

function Loading() {
  return (
    <div className='loading-screen'>
        <div className='logo-container'>
            <Image src={logo} alt="logo"/>
        </div>

        <div>
            <h1>Loading...Please wait :)</h1>
        </div>
    </div>
  )
}

export default Loading
