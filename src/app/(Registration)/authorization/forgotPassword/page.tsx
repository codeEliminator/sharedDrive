'use client'
import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import CheckPasswordStrength from "@/app/(App)/helpers/CheckPasswordStrength"
import Modal from '@/app/Modal/Modal';
import { useRouter } from 'next/navigation';

export default function forgotPassword() {
  const [email, setEmail] =  useState('')
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState('')
  const search = useSearchParams().get('recoveryPasswordToken')
  const getEmail = useSearchParams().get('email')
  const [active, setActive] = useState(false)
  const [token, setToken] = useState('8hfdufuasdbu5bu')
  const router = useRouter()
  useEffect(()=>{
    if(localStorage.getItem('token') != null){
      setToken(localStorage.getItem('token')!)
    }
    if(getEmail!=null){
      setEmail(getEmail)
    }
    // localStorage.removeItem('token')
  }, [])
  // useEffect(()=>{
  //   localStorage.setItem('token', token)
  // }, [token])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch('http://localhost:2525/password-recovery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include'
    })
    const data = await response.json()
    localStorage.setItem('token', data.token)
  }
  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch('http://localhost:2525/userPasswordChange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })
    const data = await response.json()
    if(data.status == 200 ){
      setActive(true)
      setTimeout(()=>{
        router.push('/authorization')
      }, 2000)
    }
  }
  return (
    <>
    {
      active ? <Modal active={active} setActive={setActive}>
        <div>You will be redirected. Your password Changed</div>
      </Modal> : null
    }
    <div className='h-lvh w-lvw bg-primary-content overflow-hidden' >
        <div className="flex items-center justify-center h-full">
          <div className='bg-white p-5 rounded border-2  shadowBox ' style={{width: '450px', height: '550px', borderRadius: '36px 36px 36px 36px'}}>
            <div className='w-full h-full flex items-center flex-col '>
              <div className="flex-row items-center ">
                <Link href='/'><img src="/right-arrow.png" alt="" className="w-3 h-3 rotate-180 mr-2"/></Link>
                <div className="text-xl">Welcome to Shared Drive Recovery</div>
              </div>
              {
                search == token ? <form onSubmit={handlePasswordChange}>
                <label className="input input-bordered flex items-center gap-2 my-2">
                  Email
                  <input type="email" className="grow" placeholder="Your Email" onChange={(evt)=>setEmail(evt.target.value)} value={getEmail!} disabled/>
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                  Password
                  <Password onChange={(evt)=>{
                    setStrength(CheckPasswordStrength(evt.target.value));setPassword(evt.target.value)
                    }} placeholder="Strong Password" toggleMask/>
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                  Repeat Password
                  <input type="password" className="grow" placeholder="Strong Password" 
                  onChange={
                    (evt)=>{
                      setPasswordCheck(evt.target.value)
                    }
                  }
                  style={
                    passwordCheck.length === 0
                      ? {}
                      : passwordCheck === password
                        ? { border: 'solid 1px green' } 
                        : { border: 'solid 1px red' } 
                  }
                  />
              </label>
                <button className='btn btn-neutral' disabled={!email || !password || !passwordCheck || password != passwordCheck || !strength} type='submit'>Get Password</button>
              </form> 
              : 
              <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center gap-2 my-2">
                  Email
                  <input type="email" className="grow" placeholder="Your Email" onChange={(evt)=>setEmail(evt.target.value)}/>
                </label>
                <button className='btn btn-neutral' disabled={!email} type='submit'>Get Password</button>
              </form>
              }
              
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
