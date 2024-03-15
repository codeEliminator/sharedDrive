'use client'
import React, {useEffect, useState} from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import RouteView from './RouteView'

const Routes = () => {
  const router = useRouter()
  const [startLocation, setStartLocation] = useState(useSearchParams().get('startLocation'))
  const [endLocation, setEndLocation] = useState(useSearchParams().get('endLocation'))
  const [passengerCount, setPassengerCount] = useState(useSearchParams().get('passengerCount'))
  const [date, setDate] = useState(useSearchParams().get('date'))
  const [trips, setTrips] = useState([])
  useEffect(()=>{
    const getTripsWithData = async () => {
      const response = await fetch(`http://localhost:2525/api/get-routes-date?startLocation=${startLocation}&endLocation=${endLocation}&passengerCount=${passengerCount}&date=${date}`)
      const data = await response.json()
      setTrips(data)
    }
    getTripsWithData()
  },[])
  console.log(trips)
  return (
  
   <>
    {
      !trips ? <div>No Trips found</div>
      :
      trips.map((tripItem, idx) => (  
        <RouteView tripItem={tripItem} key={idx}></RouteView>
        ))
    }
   </>
  )
}

export default Routes
