'use client'
import React, {useEffect, useState} from 'react'
import { useUser } from '@/context/UserContext'

const ProfileView = () => {
  const [avatar, setAvatar] = useState('')
  const {user} = useUser()
  useEffect(()=>{
    const imageName = `${user?.name}____${user?.email}___${user?.randomBytes}.png`;
    const getAvatar = async () => {
      const response = await fetch(`http://localhost:2525/image/${imageName}`)
      setAvatar(response.url)
    }
    getAvatar()
  }, [user])
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='w-2/5 flex flex-col p-4'>
          <div className='flex flex-row justify-between'>
            <div className='flex-row items-center'>
              <div>
                {!avatar ? <img src='/userProfile.png' alt="" className='w-12 h-12 mr-2'/> : <img src={avatar} alt="" className='w-12 h-12 mr-2 rounded-full'/>}
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
