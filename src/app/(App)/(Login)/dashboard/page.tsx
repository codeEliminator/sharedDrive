'use client'
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';

import DriverView from './PassengerDriverTabView/DriverView/DriverView';
import PassengerView from './PassengerDriverTabView/PassengerView/PassengerView';
import './profile/Profile.css'

const Dashboard = () => {
  const [isActive, setActive] = useState('driver')
  const handleActive = (item: string) => {
    setActive(item)
  }
  const [activeTrips, setActiveTrips] = useState([])
  const [activeDriverTrips, setActiveDriverTrips] = useState([])
  const {user} = useUser()
  const showAlert = (message: string) => {
    alert(message);
  };
  useEffect(() => {
    const getActiveTrips = async () => {
      try {
        const response = await fetch(`http://localhost:2525/api/routes/get-user-trips?activeTrips=${encodeURIComponent(JSON.stringify(user?.activeTrips))}`);
        if (response.ok) {
          const data = await response.json();
          setActiveTrips(data);
        } 
      } catch (error) {
        console.error('Error fetching active trips:', error);
      }
    };
    const getActiveDriverTrips = async () => {
      try {
        const response = await fetch(`http://localhost:2525/api/get-user-trips?randomBytes=${user?.randomBytes}`);
        if (response.ok) {
          const data = await response.json();
          setActiveDriverTrips(data);
        } 
      } catch (error) {
        console.error('Error fetching active trips:', error);
      }
    };
    if (user?.activeTrips) {
      getActiveTrips();
      getActiveDriverTrips();
    }
  }, [user]);
  
  return (
    
    <>
      <div className='flex justify-center flex-col items-center'>
        <div className='items-center flex flex-row border-shadow w-4/5'>
          <div className={isActive == 'driver' ? 'content-item active' : 'content-item'} onClick={()=>handleActive('driver')}>Driver Trips</div>
          <div className={isActive == 'driver' ? 'content-item' : 'content-item active'} onClick={()=>handleActive('passenger')} >Passenger Trips</div>
        </div>
          {
            isActive == 'driver' ? <DriverView activeTrips={activeDriverTrips} showAlert={showAlert} user={user}/> 
            :
            <PassengerView activeTrips={activeTrips} showAlert={showAlert} user={user}/>
          }
      </div>

   </>
  );
};

export default Dashboard;
