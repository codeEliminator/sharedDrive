'use client';
import React, { useState } from 'react'
import PlusSvg from '../helpers/Plus-svg';
import MinusSvg from '../helpers/Minus-svg';



export default function Passengers() {
  const [score, setScore] = useState(1)

  const incrementScore = () => setScore(score + 1);
  const decrementScore = () => {
    if(score == 1){
      return;
    }
    setScore(score - 1);
  }

  return (
    
    <div className="dropdown dropdown-bottom dropdown-end size-full">
      <div tabIndex={0} role="button" className="flex flex-row justify-center items-center size-full ">      
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" style={{height: "18px", width: "18px", fill: "neutral"}}><g ><path fill="currentColor" fillRule="evenodd" d="M15.3348 7.41667c0 2.07071-1.6793 3.75003-3.75 3.75003-2.07072 0-3.75-1.67932-3.75-3.75003v-.83334c0-2.07071 1.67928-3.75 3.75-3.75 2.0707 0 3.75 1.67929 3.75 3.75v.83334Zm-8.33334 0C7.00146 9.94762 9.05385 12 11.5848 12c2.5309 0 4.5833-2.05238 4.5833-4.58333v-.83334C16.1681 4.05238 14.1157 2 11.5848 2 9.05385 2 7.00146 4.05238 7.00146 6.58333v.83334ZM20.3335 20.75v-1.7433c0-1.6904-1.1257-3.1725-2.7522-3.6154-2.0325-.5548-4.0791-.8913-5.9978-.8913-1.91873 0-3.96534.3365-5.99806.8914-1.6263.4428-2.75194 1.9249-2.75194 3.6153V20.75c0 .2301.18654.4167.41666.4167H19.9168c.2301 0 .4167-.1866.4167-.4167Zm-2.9714-4.5547c1.2631.344 2.1381 1.4959 2.1381 2.8114v1.3266H3.66683v-1.3266c0-1.3155.87493-2.4674 2.13781-2.8113 1.9672-.537 3.9441-.8621 5.77886-.8621 1.8347 0 3.8117.3251 5.7786.862Z" clipRule="evenodd"></path></g></svg>
        <span className='ml-1'>{score}</span>
      </div>
        <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box mt-3">
          <div className='flex flex-row justify-center items-center p-2'>
            <span className='text-xl'>Passengers: </span>
            <div className='ml-2 cursor-pointer'><MinusSvg onClick={decrementScore}/></div>
            <div className='ml-2 mr-2 text-xl'>{score}</div>
            <div className='cursor-pointer'><PlusSvg onClick={incrementScore}/></div>
          </div>
        </div>
    </div>
  )
}
