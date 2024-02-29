'use client'
import React, {useState} from 'react'
import MyProfile from './MyProfile/MyProfile'
import Settings from './SettingsView/Settings'
import './Profile.css'

const Profile = () => {
  const [isActive, setActive] = useState('about')
  const handleActive = (item: string) => {
    setActive(item)
  }
  return (
    <div className='flex justify-center flex-col items-center'>
      <div className='items-center flex flex-row border-shadow w-4/5'>
        <div className={isActive == 'about' ? 'content-item active' : 'content-item'} onClick={()=>handleActive('about')}>My Profile</div>
        <div className={isActive == 'about' ? 'content-item' : 'content-item active'} onClick={()=>handleActive('settings')} >Settings</div>
      </div>
        {
          isActive == 'about' ? <MyProfile/> : <Settings />
        }
    </div>
  )
}

export default Profile
