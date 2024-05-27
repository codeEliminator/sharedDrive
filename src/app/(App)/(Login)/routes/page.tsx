'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import RouteView from './RouteView'

const Routes = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const startLocation = searchParams.get('startLocation') || ''
  const endLocation = searchParams.get('endLocation') || ''
  const passengerCount = searchParams.get('passengerCount') || '1'
  const date = searchParams.get('date') || ''
  
  const [trips, setTrips] = useState([])

  const showAlert = (message: string) => {
    alert(message);
    router.refresh()
  };

  useEffect(() => {
    const getTripsWithData = async () => {
      try {
        const response = await fetch(`http://localhost:2525/api/get-routes-date?startLocation=${encodeURIComponent(startLocation)}&endLocation=${encodeURIComponent(endLocation)}&passengerCount=${encodeURIComponent(passengerCount)}&date=${encodeURIComponent(date)}`)
        
        if (response.ok) {
          const data = await response.json()
          setTrips(data)
        } else {
          setTrips([])
        }
      } catch (error) {
        console.error('Error fetching trips:', error)
        showAlert('Server error')
      }
    }
    if (startLocation && endLocation && passengerCount && date) {
      getTripsWithData()
    }
  }, [startLocation, endLocation, passengerCount, date])

  return (
    <>
      {
        trips.length === 0 ? <div>No Trips found</div>
          :
          trips.map((tripItem, idx) => (
            <RouteView tripItem={tripItem} key={idx} showAlert={showAlert} />
          ))
      }
    </>
  )
}

export default Routes
