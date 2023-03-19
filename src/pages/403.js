import Link from 'next/link'
import React from 'react'
import { MdLockPerson } from 'react-icons/md'

function ER404() {
  return (
    <div className='wrapper403'>
        <div className='wrapperOfWrapper403'>
          <div className='image403'>
            <MdLockPerson />  
          </div>

          <div>
            <p>Access denied</p>
          </div>
          

          <div className='infoErr403'>
            <p>You do not have permission to access this page.</p>
            <p>Please contact Site Administrator(s) to request access.</p>
          </div>

          <div className='buttonErr403'>
            <button onClick={() => window.location.href = '/'}>Return to homepage</button>
          </div>
        </div>
    </div>
  )
}

export default ER404
