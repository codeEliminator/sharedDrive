'use client'
import React, { useState, useEffect } from "react"
import './Registration.css'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2"
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import CheckPasswordStrength from "@/app/(App)/helpers/CheckPasswordStrength"

export default function Registration() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [surname, setSurname] =  useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [strength, setStrength] = useState(false)
  const [role, setRole] = useState('')

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
    console.log(data.message);
  };
  useEffect(()=>{
    const getCountry = async () => {
      await fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => setCountry(data.country_code))
    }
    getCountry()
  }, [])
  return (
    <form onSubmit={handleSubmit}>
      <div className='h-lvh w-lvw bg-primary-content overflow-hidden' >
        <div className="flex items-center justify-center h-full">
          <div className='bg-white p-5 rounded border-2  shadowBox' style={{width: '450px', height: '550px', borderRadius: '36px 36px 36px 36px'}}>
            <div className="text-xl mb-2">Welcome to Shared Drive</div>
            <div className="flex flex-col">
              <label className="input input-bordered flex items-center gap-2">
                Name
                <input type="text" className="grow" placeholder="Artem" onChange={(evt)=>setName(evt.target.value)} />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Surname
                <input type="text" className="grow" placeholder="Gates" onChange={(evt)=>setSurname(evt.target.value)} />
              </label>
              <label className="input input-bordered flex items-center gap-2 my-2">
                Email
                <input type="email" className="grow" placeholder="my@email.com" onChange={(evt)=>setEmail(evt.target.value)}/>
              </label>
              <label className="input input-bordered flex items-center gap-2 my-2">
                Password
                <Password onChange={(evt)=>{setStrength(CheckPasswordStrength(evt.target.value));setPassword(evt.target.value)}} placeholder="Strong Password" toggleMask/>
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
              <PhoneInput
                placeholder="1234567890"
                value={phoneNumber}
                country={country.toLowerCase()}
                onChange={setPhoneNumber}
              />
              <div className="mb-2">
                <div>
                  <span className="text-xl">Who are you?</span>
                </div>
                <label className="flex flex-row items-center">
                  <span className="text-xl">Driver</span>
                  <input type="radio" id='Driver' value='Driver' name="role" className="ml-2 h-4 w-4" onChange={(evt)=>handleChangeOption(evt)} />
                </label>
                <label className="flex flex-row items-center">
                  <span className="text-xl">Passenger</span>
                  <input type="radio" id='Passenger' value='Passenger' name="role" className="ml-2 h-4 w-4" onChange={(evt)=>handleChangeOption(evt)}/>
                </label>
              </div>
              <button className="btn btn-neutral" disabled={!name || !surname || !email || !password || !passwordCheck || password !== passwordCheck || !phoneNumber || !strength }>Register</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    
  )
}
