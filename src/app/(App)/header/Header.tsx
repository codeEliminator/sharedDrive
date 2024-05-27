'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useUser } from '@/context/UserContext';
import fetchUserData from '../helpers/GetUserData';
import { useRouter } from 'next/navigation';

export default function Header() {
  const {user, setUser} = useUser()
  const router = useRouter()
  useEffect(() => {
    const getUserData = async() => {
      const data = await fetchUserData()
      setUser(data);
    }
    getUserData()
  }, []);
  return (
    <header >
      <div className='bg-primary-content flex justify-center'>
        <div className='flex items-center w-3/5 justify-around'>
          <Link href='/'><img src='/logo2.png' alt="logo" className='h-20 p-2' /></Link>
          <div>
            <span className='text-xl'>Shared Drive</span>
            {/* <span className='text-neutral font-medium mr-6 link' onClick={()=>console.log(user)}>Shared Drive</span>
            <span className='text-neutral font-medium link '>Bus</span> */}
          </div>
          <div className='flex flex-row justify-center items-center'>
            {/* <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button> */}
            <div className='btn btn-ghost text-lg ml-1 font-normal'>
              {
                user ? 
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className=" m-1">{user.name}</div>
                    <ul tabIndex={0} className="dropdown-content z-[1000] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <Link href='/dashboard' className='z-[1000]'><li><a>Dashboard</a></li></Link>
                      <Link href='/dashboard/profile' className='z-[1000]'><li><a>Profile</a></li></Link>
                      <Link href='/rideCreator' className='z-[1000]'><li><a>Make A Ride</a></li></Link>
                      <Link href='/logout' className='z-[1000]'><li><a className='text-red-500 font-bold'>Log Out</a></li></Link>
                  </ul>
                </div>
                : 
                <Link href='/authorization'> <input value='Sign in' type='button' /> </Link>
              }
              
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
