import React from 'react'

export default function Bottom() {
  return (
      <div style={{background: '#d0e1ff'}} className='flex justify-center items-center'>
        <div className='w-11/12 flex items-center justify-center'>
          <div>
            <img src="./block_website.jpg" alt="image" style={{height:'410px', width:'750px'}}/>
          </div>
          <div className='flex flex-col w-5/12'>
            <h1 className='text-xl font-bold'>Your Safety is our priority </h1>
            <p className='mb-2'>
              We work hard to make our platform as secure as possible. 
              But when fraud does happen, we want you to know exactly how to avoid it and how to report it.
              Follow our tips to help us keep you safe.
            </p>
            <div className='flex flex-row-reverse'>
              <button className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
