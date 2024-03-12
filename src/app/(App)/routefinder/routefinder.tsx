import React from 'react'
import './routefinder.css'
import CalendarComponent from '../Calendar/Calendar'
import { getServerSideProps } from '../helpers/getServerSideProps'
import Passengers from '../Passengers/Passengers'

export default async function RouteFinder() {
  const initialDate = await getServerSideProps();
  return (
    <div className='flex justify-center items-center'>
        <div className='wrapper p-2 rounded-2xl z-10 bg-neutral-300/70'> 
        <form    className='flex flex-row'>
            <div className='search-from flex justify-center items-center border-solid border-r-2 border-neutral-300' >
                <label>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" style={{height: "24px", width: "24px", fill: 'black'}}><title>Звідки?</title><g color="var(--_1gzv7bhc)"><path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"></path></g></svg>
                </label>
                <input className = 'p-2' placeholder='From'></input>
            </div>
            <div className='search-to flex justify-center items-center border-solid border-r-2 border-neutral-300' >
                <label>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" style={{height: "24px", width: "24px", fill: 'black'}}><title>Звідки?</title><g color="var(--_1gzv7bhc)"><path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"></path></g></svg>
                </label>
                <input className = 'p-2 ' placeholder='To'></input>
            </div>
            <div className="border-solid border-r-2 border-neutral-300 p-2">
              <CalendarComponent initialDate={initialDate}></CalendarComponent>
            </div>
            <div className="border-solid border-r-2 border-neutral-300 p-4">
              <Passengers />
            </div>
            <div className='ml-2 flex justify-center items-center'>
              <button type='submit' className="btn btn-success">Go</button>
            </div>
        </form>
        </div>
    </div>

  )
}
