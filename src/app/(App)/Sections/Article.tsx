import React from 'react'
import './Article.css'

export default function Article() {
  return (
    <div className='w-full flex justify-center items-center '>
      <div className='flex flex-row justify-around items-center w-4/5 '>
        <div className='part-sec'>
          <h1 className='text-xl font-bold header-text'>Choose trips at a low price</h1>
          <p>
            Whether you're traveling by bus or sharing a ride, discover the perfect journey from a multitude of destinations and routes – all at affordable prices.
          </p>
        </div>
        <div className='part-sec'>
          <h1 className='text-xl font-bold header-text'>Trust your companions</h1>
          <p>
            All drivers are verified before creating a trip. We check reviews and profiles so you can travel with confidence.
          </p>
        </div>
        <div className='part-sec'>
            <h1 className='text-xl font-bold header-text'>
              Easy interface. Click and book your trip
            </h1>
            <p>Booking a trip has never been this easy. Our service will find a driver near you in seconds</p>
        </div>
      </div>
    </div>
  )
}
