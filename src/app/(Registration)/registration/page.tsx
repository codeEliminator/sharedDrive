'use client'
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import './Registration.css'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2"
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import CheckPasswordStrength from "@/app/(App)/helpers/CheckPasswordStrength"
import Link from "next/link"


export default function Registration() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [surname, setSurname] =  useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [strength, setStrength] = useState(false)
  const [role, setRole] = useState('')
  const [status, setStatus] = useState(null)
  const handleChangeOption = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRole(evt.target.value)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const userData = {
      name,
      surname,
      email,
      password, 
      phoneNumber,
      role,
    };
    const response = await fetch('http://localhost:2525/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    setStatus(data.status)
  };
  useEffect(()=>{
    localStorage.removeItem('token')
    const getCountry = async () => {
      await fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => setCountry(data.country_code))
    }
    getCountry()
  }, [])
  useEffect(()=>{
    if(status == 201){
      router.push('/authorization')
    }
  }, [status])
  return (
    <form onSubmit={handleSubmit}>
      <div className='h-lvh w-lvw bg-primary-content overflow-hidden' >
        <div className="flex items-center justify-center h-full">
          <div className='bg-white p-5 rounded border-2  shadowBox' style={{width: '450px', height: '550px', borderRadius: '36px 36px 36px 36px'}}>
            <div className="flex-row items-center mb-2">
              <Link href='/authorization'><img src="/right-arrow.png" alt="" className="w-3 h-3 rotate-180 mx-2"/></Link>
              <div className="text-xl">Welcome to Shared Drive</div>
            </div>
            <div className="flex flex-col">
              <label title="Name" className="input input-bordered flex items-center gap-2 mb-2">
                Name
                <input type="text" className="grow" placeholder="Artem" onChange={(evt)=>setName(evt.target.value)} />
              </label>
              <label title='Surname' className="input input-bordered flex items-center gap-2 my-2">
                Surname
                <input type="text" className="grow" placeholder="Gates" onChange={(evt)=>setSurname(evt.target.value)} />
              </label>
              <label title="Email" className="input input-bordered flex items-center gap-2 my-2">
                Email
                <input type="email" className="grow" placeholder="my@email.com" onChange={(evt)=>setEmail(evt.target.value)}/>
              </label>
              <label title="Password" className="input input-bordered flex items-center gap-2 my-2">
                Password
                <Password onChange={(evt)=>{
                  setStrength(CheckPasswordStrength(evt.target.value));setPassword(evt.target.value)
                  }} placeholder="Strong Password" toggleMask/>
              </label>
              <label title="Repeat Password" className="input input-bordered flex items-center gap-2 my-2">
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
              <div title="phone number" className="my-2">
                <PhoneInput
                  placeholder="1234567890"
                  value={phoneNumber}
                  country={'ua'}
                  onChange={setPhoneNumber}
                />
              </div>
              <button className="btn btn-neutral my-2" disabled={!name || !surname || !email || !password || !passwordCheck || password !== passwordCheck || !phoneNumber || !strength }>Register</button>
            </div>
            {
              status == null ? null 
                : 
              status == 400 ?
                <div className="text-red-500 text-sm">Email is registered</div> : <div className="text-red text-sm">Unexpected error! Try again later</div> 
            }
          </div>
        </div>
      </div>
    </form>
    
  )
}
