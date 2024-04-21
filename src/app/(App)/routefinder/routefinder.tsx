'use client'
import React, {useState, useEffect} from 'react'
import './routefinder.css'
import CalendarComponent from '../Calendar/Calendar'
import { getServerSideProps } from '../helpers/getServerSideProps'
import { useRouter } from 'next/navigation'
import Loading from '../loading'
import PlusSvg from '../helpers/Plus-svg';
import MinusSvg from '../helpers/Minus-svg';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
// recognition.lang = 'ru-RU';
// recognition.continuous = true;
// // recognition.start();

// navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
//   const audioContext = new AudioContext();
//   const analyser = audioContext.createAnalyser();
//   const microphone = audioContext.createMediaStreamSource(stream);
//   microphone.connect(analyser);
//   const dataArray = new Uint8Array(analyser.frequencyBinCount);

//   function checkAudio() {
//     analyser.getByteTimeDomainData(dataArray);
//     let sum = 0;
//     for(let i = 0; i < dataArray.length; i++) {
//       sum += dataArray[i];
//     }
//     let average = sum / dataArray.length;

//     if (average > 255) {
//       if (recognition.isPaused) {
//         // recognition.start(); 
//       }
//     } else {
//       if (!recognition.isPaused) {
//         recognition.stop(); 
//       }
//     }
//   }

//   setInterval(checkAudio, 100);
// }).catch(error => console.error(error));



export default function RouteFinder() {
  const router = useRouter()
  const [passengerCount, setPassengerCount] = useState(1)
  const [initialDate, setInitialDate] = useState('')
  const [startLocation, setStartLocation] = useState('')
  const [endLocation, setEndLocation] = useState('')
  const [loading, setLoading] = useState<Boolean>(true)
  const [date, setDate] = useState<Date | null>()
  const incrementScore = () => setPassengerCount(passengerCount + 1);
  const decrementScore = () => passengerCount == 1 ? null : setPassengerCount(passengerCount - 1);
  useEffect(()=>{
    setLoading(true)
    const getPropsFromServer = async ()=> {
      const data = await getServerSideProps()
      setInitialDate(data)
    }
    getPropsFromServer()
    setLoading(false)
  }, [])
  const findRoute = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(!startLocation || !endLocation || !passengerCount || !date){
      alert('Not enough data input')
      return
    }
    router.push(`/routes?startLocation=${startLocation}&endLocation=${endLocation}&passengerCount=${passengerCount}&date=${date}`)
  }
  return loading ?
  (<Loading />)
    :
  (
    <div className='flex justify-center items-center'>
        <div className='wrapper p-2 rounded-2xl z-10 bg-neutral-300/70'> 
        <form onSubmit={findRoute} className='flex flex-row'>
            <div className='search-from flex justify-center items-center border-solid border-r-2 border-neutral-300' >
                <label>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" style={{height: "24px", width: "24px", fill: 'black'}}><title>Звідки?</title><g color="var(--_1gzv7bhc)"><path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"></path></g></svg>
                </label>
                <input className = 'p-2' placeholder='From' onChange={(evt)=>setStartLocation(evt.target.value)}></input>
            </div>
            <div className='search-to flex justify-center items-center border-solid border-r-2 border-neutral-300' >
                <label>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" style={{height: "24px", width: "24px", fill: 'black'}}><title>Звідки?</title><g color="var(--_1gzv7bhc)"><path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"></path></g></svg>
                </label>
                <input className = 'p-2 ' placeholder='To' onChange={(evt)=> setEndLocation(evt.target.value)}></input>
            </div>
            <div className="border-solid border-r-2 border-neutral-300 p-2">
              <CalendarComponent initialDate={initialDate} setDate={setDate} date={date}></CalendarComponent>
            </div>
            <div className="border-solid border-r-2 border-neutral-300 p-4">
              <div className="dropdown dropdown-bottom dropdown-end size-full">
                <div tabIndex={0} role="button" className="flex flex-row justify-center items-center size-full ">      
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" style={{height: "18px", width: "18px", fill: "neutral"}}><g ><path fill="currentColor" fillRule="evenodd" d="M15.3348 7.41667c0 2.07071-1.6793 3.75003-3.75 3.75003-2.07072 0-3.75-1.67932-3.75-3.75003v-.83334c0-2.07071 1.67928-3.75 3.75-3.75 2.0707 0 3.75 1.67929 3.75 3.75v.83334Zm-8.33334 0C7.00146 9.94762 9.05385 12 11.5848 12c2.5309 0 4.5833-2.05238 4.5833-4.58333v-.83334C16.1681 4.05238 14.1157 2 11.5848 2 9.05385 2 7.00146 4.05238 7.00146 6.58333v.83334ZM20.3335 20.75v-1.7433c0-1.6904-1.1257-3.1725-2.7522-3.6154-2.0325-.5548-4.0791-.8913-5.9978-.8913-1.91873 0-3.96534.3365-5.99806.8914-1.6263.4428-2.75194 1.9249-2.75194 3.6153V20.75c0 .2301.18654.4167.41666.4167H19.9168c.2301 0 .4167-.1866.4167-.4167Zm-2.9714-4.5547c1.2631.344 2.1381 1.4959 2.1381 2.8114v1.3266H3.66683v-1.3266c0-1.3155.87493-2.4674 2.13781-2.8113 1.9672-.537 3.9441-.8621 5.77886-.8621 1.8347 0 3.8117.3251 5.7786.862Z" clipRule="evenodd"></path></g></svg>
                  <span className='ml-1'>{passengerCount}</span>
                </div>
                  <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box mt-3">
                    <div className='flex flex-row justify-center items-center p-2'>
                      <span className='text-xl'>Passengers: </span>
                      <div className='ml-2 cursor-pointer'><MinusSvg onClick={decrementScore}/></div>
                      <div className='ml-2 mr-2 text-xl'>{passengerCount}</div>
                      <div className='cursor-pointer'><PlusSvg onClick={incrementScore}/></div>
                    </div>
                  </div>
              </div>
            </div>
            <div className='ml-2 flex justify-center items-center'>
              <button type='submit' className="btn btn-success">Go</button>
            </div>
        </form>
        </div>
    </div>
  )
}
