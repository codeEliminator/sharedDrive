'use client'
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import React, {useState, useEffect} from 'react'

type RouteComponentProps = {
  tripItem: {
    userName: String;
    userEmail: String;
    startDate: Date;
    startTime: String;
    startAddress: String;
    endAddress: String;
    selectedRouteIndex: Number;
    passengerCount: Number;
    userRandomBytes: String;
    done: boolean;
  },
  showAlert: (message: string) => void
}

const RouteView: React.FC<RouteComponentProps> = ({tripItem, showAlert}) => {
  const [avatar, setAvatar] = useState('')
  const {user} = useUser()
  const markTripDone = async (evt: React.FormEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    const response = await fetch('http://localhost:2525/mark-ride-done', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripItem),
    })
    if(response.ok){
      showAlert('Ride is done! Thank You')
    }
  }
  const AddYourSelfToTrip = async (evt: React.FormEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    //do tomorrow
  }
  useEffect(()=>{
    const imageName = `${tripItem.userName}____${tripItem.userEmail}___${tripItem.userRandomBytes}.png`;
    const getAvatar = async () => {
      const response = await fetch(`http://localhost:2525/image/${imageName}`)
      setAvatar(response.url)
    }
    getAvatar()
  }, [])
  return (
    <>
      <div className='flex w-full items-center justify-center mt-10'>
        <div className='flex w-3/5 flex-col border-solid border-2 border-primary-content border-y-0 rounded bg-slate-100 p-5'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col items-center justify-center'>
              <span>{tripItem.startTime}</span>
              <span className='text-xl'>{tripItem.startAddress}</span>
            </div>
            
            <div className='flex justify-center items-center flex-col'>
              <span className='text-xl'> {new Date(tripItem.startDate).toLocaleDateString()}</span>
              <span className='text-xl'>Available Spaces: {tripItem.passengerCount.toString()}</span>
            </div>
            
            <div className='flex flex-col items-center justify-center'>
              <span>Ask from driver</span>
              <span className='text-xl'>{tripItem.endAddress}</span>
            </div>
          </div>  
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col items-center justify-center'>
              <span>Driver Info:</span>
              <Link href={`/profileView?user=${tripItem.userRandomBytes}`}>
                <div className='flex flex-row items-center '>
                  <img src={avatar} alt='avatar' className='w-10 h-10 rounded-full mr-2'></img>
                  <span className='text-xl hover:text-cyan-300 transition'>{tripItem.userName}</span>
                </div>
              </Link>
            </div>
            <div className='flex items-center justify-center'>
              {
                user?.email == tripItem.userEmail ? 
                <button className="btn btn-outline btn-success" onClick={markTripDone} disabled={tripItem.done}>Mark As Done</button>
                :
                <button className="btn btn-outline btn-success" onClick={AddYourSelfToTrip}>GO</button>
              }

            </div>

          </div>
        </div>
        
      </div>
    </>
    
  )
}

export default RouteView
