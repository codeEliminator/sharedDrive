import React from 'react'
import ChangeThemeButton from '../helpers/ChangeThemeButton'
import Link from 'next/link'
import { useUser } from '@/context/UserContext';
import { Route } from 'next'


export default function Header() {
  const {user} = useUser();
  console.log(user)
  return (
    <header style={{marginBottom: '25px'}}>
        <div className='bg-primary-content  flex items-center justify-evenly'>
          <Link href='/'><img src='/logo2.png' alt="logo" className='h-20 p-2' /></Link>
          <div>
            <span className='text-neutral font-medium mr-6 link'>Shared Drive</span>
            <span className='text-neutral font-medium link '>Bus</span>
          </div>
          <div className='flex flex-row justify-center items-center'>
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <div className='btn btn-ghost text-lg ml-1 font-normal'>
              {
                user ? <div>{user.name}</div> : <Link href='/authorization'> <input value='Sign in' type='button' /> </Link>
              }
              
            </div>
          </div>
        </div>
    </header>
  )
}
