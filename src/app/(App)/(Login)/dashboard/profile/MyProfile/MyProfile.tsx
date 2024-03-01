'use client'
import React from 'react'
import { useUser } from '@/context/UserContext'

const MyProfile = () => {
  const {user} = useUser()
  const verifyEmail = () => {
    const getEmailVerified = async () => {
      const url = 'https://zerobounce1.p.rapidapi.com/v2/validate?api_key=a84132a5f7cd49c3af0883adcc02d923&email=' + user?.email.slice(0, user?.email.indexOf('@')) + '%40' + user?.email.slice(user?.email.indexOf('@') + 1, user?.email.length);

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'a84132a5f7cd49c3af0883adcc02d923',
          'X-RapidAPI-Host': 'zerobounce1.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    getEmailVerified()
  }
  return (
    <div className='w-3/5 flex items-center justify-center mt-5'>
      <ul className='list-none w-full'>
        <li>
          <div className='flex flex-row justify-between p-6 rounded-full items-center hover:bg-slate-300 ease-out duration-150  hover:p-10 '>
              <span className='flex flex-col'>
                <span className='text-3xl '>{user?.name}</span>
                <span className='text-sm opacity-50'>Newbie</span>
              </span>
              <span className='flex flex-row items-center'>
                <img src='/userProfile.png' alt="" className='w-12 h-12'/>
                <img src="/right-arrow.png" alt="" className='w-5 h-5 ml-4'/>
              </span>
          </div>
        </li>
        <li>
          <div className='rounded-full p-4 hover:bg-slate-300 ease-out duration-150 hover:p-6 justify-between items-center flex-row'>
            <span className='text-lg'>Add Profile Picture</span>
            <img src="/right-arrow.png" alt="" className='w-3 h-3 mr-2'/>
              {/* <span className='mr-2'>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" style={{height: '25px', width: '25px', fill: 'black'}}><g color="black"><path stroke-width="0" fill="var(--_1gzv7bh10)" fill-rule="evenodd" d="M1.14 11.5a10.36 10.36 0 1120.72 0 10.36 10.36 0 01-20.72 0zM11.5 0a11.5 11.5 0 100 23 11.5 11.5 0 000-23zm.57 6.53a.57.57 0 00-1.14 0v4.4h-4.4a.57.57 0 100 1.14h4.4v4.4a.57.57 0 101.14 0v-4.4h4.4a.57.57 0 000-1.14h-4.4z"></path></g></svg>
              </span> */}
          </div>
        </li>
        <li>
          <div className='rounded-full p-4 hover:bg-slate-300 ease-out duration-150 hover:p-6 justify-between items-center flex-row'>
            <span className='text-lg '>Edit Profile Info</span>
            <img src="/right-arrow.png" alt="" className='w-3 h-3 mr-2'/>
          </div>
        </li>
        <hr className='my-2' />
        <ul className='list-none w-full'>
          <li>
            <div className='rounded-full p-4 hover:bg-slate-300 ease-out duration-150 hover:p-6 justify-between items-center flex-row'>
              <span className='text-lg'>Verify Identity</span>
              <img src="/right-arrow.png" alt="" className='w-3 h-3 mr-2'/>
            </div>
          </li>
          <li>
            <div className='rounded-full p-4 hover:bg-slate-300 ease-out duration-150 hover:p-6 justify-between items-center flex-row' onClick={verifyEmail}>
              <span><span className='text-lg mr-3'>Verify Email</span><span className='text-lg text-blue-400 link italic'>{user?.email}</span></span>
              <img src="/right-arrow.png" alt="" className='w-3 h-3 mr-2'/>
            </div>
          </li>
          <li>
            <div className='rounded-full p-4 hover:bg-slate-300 ease-out duration-150 hover:p-6 justify-between items-center flex-row'>
              <span>
                <span className='text-lg mr-3'>Verify Phone Number</span><span className='text-lg text-blue-400 link italic'>+{user?.phoneNumber}</span>
              </span>
              <img src="/right-arrow.png" alt="" className='w-3 h-3 mr-2'/>
            </div>
          </li>
          <hr className='my-2' />
          <li>
            <div className='rounded-full p-4 hover:bg-slate-300 ease-out duration-150 hover:p-6 justify-between items-center flex-row'>
              <span className='text-lg mr-3'>Add Info About Yourself</span>
              <img src="/right-arrow.png" alt="" className='w-3 h-3 mr-2'/>
            </div>
          </li>
          <li>
            <div className='rounded-full p-4 hover:bg-slate-300 ease-out duration-150 hover:p-6 justify-between items-center flex-row'>
              <span className='text-lg mr-3'>Add Your Car Info</span>
              <img src="/right-arrow.png" alt="" className='w-3 h-3 mr-2'/>
            </div>
          </li>
        </ul>
      </ul>
    </div>
  )
}

export default MyProfile
