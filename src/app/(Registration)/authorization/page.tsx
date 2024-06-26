'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Link from 'next/link';

export default function Authorization() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const router = useRouter()
  useEffect(()=>{
    localStorage.removeItem('token')
  }, [])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:2525/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', 
      });
      const data = await response.json();
      console.log('DATA', data);
      setStatus(data.status)
      if(data.status == 201){
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Ошибка во время запроса', error);
    }
  };
  useEffect(()=>{
    if(status == 201){
      router.push('/dashboard');
    }
  }, [status])
  return (
    <form onSubmit={handleSubmit}>
      <div className='h-lvh w-lvw bg-primary-content overflow-hidden' >
        <div className="flex items-center justify-center h-full">
          <div className='bg-white p-5 rounded border-2  shadowBox ' style={{width: '450px', height: '550px', borderRadius: '36px 36px 36px 36px'}}>
            <div className='w-full h-full flex items-center flex-col '>
              <div className="flex-row items-center ">
                <Link href='/'><img src="/right-arrow.png" alt="" className="w-3 h-3 rotate-180"/></Link>
                <div className="text-xl">Welcome to Shared Drive</div>
              </div>
                <div className='flex flex-col'>
                  <label className="input input-bordered flex items-center gap-2 my-2">
                    Email
                    <div title='email'>
                      <input type="email" className="grow" placeholder="Your Email" onChange={(evt)=>setEmail(evt.target.value)}/>
                    </div>
                    
                  </label>
                  <label className="input input-bordered flex items-center gap-2 my-2 ">
                    Password
                    <div>
                      <Password onChange={(evt)=>{setPassword(evt.target.value)}} placeholder="Enter Password" feedback={false} toggleMask/>
                    </div>
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
                  <Link href={'/registration'}>
                    <div className='link text-lg text-blue-300 hover:text-blue-500'> Don't have an Account?</div>
                  </Link>
                  <Link href={'/authorization/forgotPassword'}>
                    <div className='link text-lg text-blue-300 hover:text-blue-500'>Forgot Password?</div>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    
  )
}
