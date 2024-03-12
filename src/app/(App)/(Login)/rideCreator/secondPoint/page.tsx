'use client'
import React, {useState} from 'react'
import GoogleMap from '../../../GoogleMaps/GoogleMaps'
import { useSearchParams } from 'next/navigation'

const SecondPointCreator = () => {
  const [address, setAddress] = useState('')
  const search = useSearchParams();
  const [firstPoint, setFirstPoint] = useState({lat: search.get('lat'), lng: search.get('lng')}); 

  const handleSearch = async () => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAfZm8YP3fWLPMbQU8DCc0s_9TLeSwKjJE`;
  
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ lat, lng }); 
      } else {
        alert('Адрес не найден');
      }
    } catch (error) {
      console.error('Ошибка при получении координат:', error);
      alert('Ошибка при поиске адреса');
    }
  };
  return (
    <div className='flex justify-center items-center mt-24 flex-row'>
      <div className='flex flex-row w-full items-center justify-center'>
        <div className='flex w-1/5 flex-col mr-2'>
          <div className='text-4xl'>Where Are You Going To?</div>
          {/* <AutocompleteInput/> */}
          <input id="autocomplete" type="text" placeholder="Type here" className="my-2 input input-bordered input-primary w-full max-w-xs" onChange={(evt)=>{setAddress(evt.target.value)}}/>
          <button onClick={handleSearch} className='btn bg-primary-content w-full'>Search</button>
        </div>
        <div className='w-3/5'>
          <GoogleMap lat={location.lat} lng={location.lng} zoom={10} />
        </div>
      </div>
      
    </div>
  )
}

export default SecondPointCreator
