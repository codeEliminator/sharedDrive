'use client'
import React from 'react'
import { useUser } from '@/context/UserContext'

const ProfileView = () => {
  const {user} = useUser()
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='w-2/5 flex flex-col p-4'>
          <div className='flex flex-row justify-between'>
            <div className='flex-row items-center'>
              <div>
                <img src="/userProfile.png" alt="" className='w-12 h-12 mr-2'/>
              </div>
              <div className='text-3xl' >
                <span>{user?.name}</span>
              </div>
            </div>
            <div id='rating' className='flex items-center justify-center'>
              <span className='text-2xl'>
                <span className='italic'>rating: </span> 
                <span>{user?.rating.toString()}</span>
              </span>
              <img src="/RatingStar.png" alt="" className='w-5 h-5'/>
            </div>
          </div>
          <div id='rides' className='flex items-center justify-center my-4 flex-col' >
            <img src="/No-rides.png" alt="" style={{width: '700px', height: '700px'}} />
            <div className=' text-4xl mt-2'>No Rides still</div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default ProfileView
