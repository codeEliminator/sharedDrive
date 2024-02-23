import React from 'react'
import RouteFinder from './routefinder/routefinder'
import Article from './Sections/Article'
import Bottom from './Bottom/Bottom'
import Footer from './Footer/Footer'
export default function Home() {

  return (
    <>
      <div className='flex justify-center items-center' style={{height: '400px'}}>
        <img src='./baraban.png' alt="" style={{height:'450px', width: '100%', position: 'absolute'}}/>
        <div className='z-10'>
          <RouteFinder  />
        </div>
      </div>
      <div className='mt-6'>
        <article className='mt-16' > 
          <Article/>
        </article>
      </div>
      <div>
        <Bottom />
      </div>
      <div>
        <Footer></Footer>
      </div>
      
    </>
    
  )
}
