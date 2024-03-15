'use client'
import React, {useEffect, useState} from 'react'
// import { useUser } from '@/context/UserContext'
import { useSearchParams, useRouter } from 'next/navigation'
import { UserType } from '@/context/UserContext'
import Loading from '../../loading'
import RouteView from '../routes/RouteView'

const ProfileView = () => {
  const [avatar, setAvatar] = useState('')
  const router = useRouter()
  const [user, setUser] = useState<UserType>()
  const [userTrips, setUserTrips] = useState([])
  const searchProps = useSearchParams()
  const randomBytes = searchProps.get('user')
  const showAlert = (message: string) => {
    alert(message);
    window.location.reload()
  };

  useEffect(()=>{
    const getUser = async () => {
      const response = await fetch(`http://localhost:2525/get-user?randomBytes=${randomBytes}`)
      if(response.ok){
        const data = await response.json()
        setUser(data)
      }
    } 
    getUser()
  }, [])
  useEffect(()=>{
    const imageName = `${user?.name}____${user?.email}___${user?.randomBytes}.png`;
    const getAvatar = async () => {
      const response = await fetch(`http://localhost:2525/image/${imageName}`)
      setAvatar(response.url)
    }
    const getTrips = async () => {
      const response = await fetch(`http://localhost:2525/api/get-user-trips?randomBytes=${randomBytes}`)
      if(response.ok){
        const data = await response.json()
        if(data){
          setUserTrips(data)
        }
      }
    }
    getTrips()
    getAvatar()
  }, [user])
  return (
    <>
    {
      user ? 
      <div className='flex items-center justify-center flex-col'>
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
        </div>  
        {
            userTrips.length == 0 ? 
              <div id='rides' className='flex items-center justify-center my-4 flex-col' >
                <img src="/No-rides.png" alt="" style={{width: '700px', height: '700px'}} />
                <div className=' text-4xl mt-2'>No Rides still</div>
              </div>
              :
              userTrips.map((tripItem, idx)=>(
                <RouteView tripItem={tripItem} key={idx} showAlert={showAlert}/>
              ))
          }  
      </div>
      :
      <Loading></Loading>

    }
      
    </>
    
  )
}

export default ProfileView
