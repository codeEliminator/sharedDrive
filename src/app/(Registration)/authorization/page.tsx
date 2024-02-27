'use client'
import React, {useState} from 'react'
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function Authorization() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const userData = { email, password };
    try {
      const response = await fetch('http://localhost:2525/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log('DATA', data);
      setStatus(data.status);
    } catch{}
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='h-lvh w-lvw bg-primary-content overflow-hidden' >
        <div className="flex items-center justify-center h-full">
          <div className='bg-white p-5 rounded border-2  shadowBox ' style={{width: '450px', height: '550px', borderRadius: '36px 36px 36px 36px'}}>
            <div className='w-full h-full flex items-center flex-col '>
              <div className="text-xl mb-2">Welcome to Shared Drive</div>
              <div className='flex flex-col'>
                <label className="input input-bordered flex items-center gap-2 my-2">
                  Email
                  <input type="email" className="grow" placeholder="Your Email" onChange={(evt)=>setEmail(evt.target.value)}/>
                </label>
                <label className="input input-bordered flex items-center gap-2 my-2">
                  Password
                  <Password onChange={(evt)=>{setPassword(evt.target.value)}} placeholder="Enter Password" feedback={false} toggleMask/>
              </label>
              <button className='btn btn-neutral' disabled={!email || !password} type='submit'>Log In</button>
              {
              status == null ? null 
                : 
              status == 400 ?
                <div className="text-red-500 text-lg">There is no User with such Email</div> : status == 405 ? 
                <div className="text-red-500 text-lg">Incorrect password</div> 
                :
              status == 201 ? <div></div> :
                <div className="text-red-500 text-lg">Unexpected error! Try again later</div> 
            }
            </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    
  )
}