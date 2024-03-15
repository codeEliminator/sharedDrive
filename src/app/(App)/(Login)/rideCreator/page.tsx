'use client';
import React, { useState } from 'react';
import GoogleMap from '../../GoogleMaps/GoogleMaps';
import { useUser } from '@/context/UserContext';
import PlusSvg from '../../helpers/Plus-svg';
import MinusSvg from '../../helpers/Minus-svg';

const RideCreator = () => {
  const {user} = useUser()
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [startLocation, setStartLocation] = useState({ lat: null, lng: null });
  const [endLocation, setEndLocation] = useState({ lat: null, lng: null });
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [routeCount, setRouteCount] = useState(0);
  const [zoom, setZoom] = useState(10)
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengerCount, setPassengerCount] = useState(1)
  const today = new Date().toISOString().split('T')[0];
  const incrementScore = () => setPassengerCount(passengerCount + 1);
  const decrementScore = () => passengerCount == 1 ? null : setPassengerCount(passengerCount - 1);

  const getGeoCodeUrl = (address: string) => `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAfZm8YP3fWLPMbQU8DCc0s_9TLeSwKjJE`;
  const fetchRouteOptions = async (startLocation: { lat: null | Number, lng: null | Number }, endLocation: { lat: null | Number, lng: null | Number }) => {
    try {
      const response = await fetch(`http://localhost:2525/api/routes?startLat=${startLocation.lat}&startLng=${startLocation.lng}&endLat=${endLocation.lat}&endLng=${endLocation.lng}`);
      if (!response.ok) {
        throw new Error('Failed to fetch route options');
      }
      const data = await response.json();
      setRouteCount(data.routeCount)
      return data.routeCount; 
    } catch (error) {
      console.error("Error fetching route options:", error);
      return 0;
    }
  };
  const submitTrip = async () => {
    const userName = user?.name
    const userEmail = user?.email
    const userRandomBytes = user?.randomBytes
    const tripData = {
      userEmail,
      userName,
      startDate: date,
      startTime: time,
      startAddress,
      endAddress,
      selectedRouteIndex,
      userRandomBytes,
      passengerCount,
    };
  
    try {
      const response = await fetch('http://localhost:2525/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result);
      alert('Trip submitted successfully!');
    } catch (error) {
      console.error('Error submitting trip:', error);
      alert('Failed to submit trip.');
    }
  };
  const handleSearchStart = async () => {
    const geocodeUrl = getGeoCodeUrl(startAddress);
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        setStartLocation({ lat, lng });
        setZoom(14)
      } else {
        alert('Start address not found');
      }
    } catch (error) {
      console.error('Error fetching start location:', error);
    }
  };

  const handleSearchEnd = async () => {
    const geocodeUrl = getGeoCodeUrl(endAddress);
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        setEndLocation({ lat, lng });
        fetchRouteOptions(startLocation, endLocation)
      } else {
        alert('End address not found');
      }
    } catch (error) {
      console.error('Error fetching end location:', error);
    }
  };

  const renderRouteOptions = () => (
    <div>
      {Array.from({ length: routeCount }, (_, i) => (
        <button key={i} onClick={() => setSelectedRouteIndex(i)} className={`btn ${selectedRouteIndex === i ? 'btn-primary' : 'btn-secondary'}`}>
          Route {i + 1}
        </button>
      ))}
    </div>
  );

  return (
    <div className='flex justify-center items-center mt-24 flex-row'>
        <div className='flex flex-row w-full items-center justify-center'>
          <div className='flex w-1/5 flex-col mr-2'>
            <div className='text-4xl'>Where Are You Going From?</div>
            <input type="text" placeholder="Type here" className="my-2 input input-bordered input-primary w-full " onChange={(e) => setStartAddress(e.target.value)} />
            <button onClick={handleSearchStart} className='btn bg-primary-content w-full'>Search Start</button>

            <div className='text-4xl mt-10'>Where Are You Going To?</div>
            <input type="text" placeholder="Type here" className="my-2 input input-bordered input-primary w-full " onChange={(e) => setEndAddress(e.target.value)} />
            <button onClick={handleSearchEnd} className='btn bg-primary-content w-full'>Search End</button>
            <div className='mt-10'>
              What Date and What hour?
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min={today}
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box mt-3">
              <div className='flex flex-row justify-center items-center p-2'>
                <span className='text-xl'>Passengers: </span>
                <div className='ml-2 cursor-pointer'><MinusSvg onClick={decrementScore}/></div>
                <div className='ml-2 mr-2 text-xl'>{passengerCount}</div>
                <div className='cursor-pointer'><PlusSvg onClick={incrementScore}/></div>
              </div>
            </div>
            <button onClick={submitTrip} className='btn bg-primary-content w-full mt-5'>Submit Trip</button>

            <div className='mt-5'>
              {routeCount > 0 && renderRouteOptions()}
            </div>
            
          </div>
          <div className='w-3/5'>
            <GoogleMap
              lat={startLocation.lat || 34}
              lng={startLocation.lng || 78}
              zoom={zoom}
              startLocation={startLocation.lat ? startLocation : null}
              endLocation={endLocation.lat ? endLocation : null}
              selectedRouteIndex={selectedRouteIndex}
            />
          </div>
        </div>
      </div>
    
  );
};

export default RideCreator;
