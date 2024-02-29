'use client'
import React, {useEffect} from 'react'
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';


export default function page() {
  const {setUser} = useUser()
  const router = useRouter()
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:2525/logout', { credentials: 'include', method: 'POST' });
      console.log('logoutPage')
      const data = await response.json();
      if(data.status == 200){
        setUser(null);
        router.push('/')
      }
    };
    fetchUserData();
  }, []);
  return (
    <div>
      Logout
    </div>
  )
}
