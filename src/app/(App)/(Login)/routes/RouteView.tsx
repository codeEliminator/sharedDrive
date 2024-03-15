'use client'
import Link from 'next/link';
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
  }
}

const RouteView: React.FC<RouteComponentProps> = ({tripItem}) => {
  const [avatar, setAvatar] = useState('')
  useEffect(()=>{
    const imageName = `${tripItem.userName}____${tripItem.userEmail}___${tripItem.userRandomBytes}.png`;
    const getAvatar = async () => {
      const response = await fetch(`http://localhost:2525/image/${imageName}`)
      setAvatar(response.url)
    }
    getAvatar()
  }, [])
  console.log('DATA: ', tripItem)
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
          <div className='flex flex-col'>
            <span>Driver Info:</span>
            <Link href={`/profileView?user=${tripItem.userRandomBytes}`}>
              <div className='flex flex-row items-center '>
                <img src={avatar} alt='avatar' className='w-10 h-10 rounded-full mr-2'></img>
                <span className='text-xl'>{tripItem.userName}</span>
              </div>
            </Link>
            
          </div>
        </div>
        
      </div>
    </>
    
  )
}

export default RouteView
