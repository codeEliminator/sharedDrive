'use client'
import React, {useEffect, useState} from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const Routes = () => {
  const router = useRouter()
  const [startLocation, setStartLocation] = useState(useSearchParams().get('startLocation'))
  const [endLocation, setEndLocation] = useState(useSearchParams().get('endLocation'))
  const [passengerCount, setPassengerCount] = useState(useSearchParams().get('passengerCount'))
  useEffect(()=>{
    if(!startLocation || !endLocation || passengerCount){
      router.push('/')
    }
  },[])
  return (
    <div>
      {startLocation}--------<div>{endLocation}</div>
    </div>
  )
}

export default Routes
