'use client'
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';

const Dashboard = () => {
  const { setUser } = useUser();
  useEffect(() => {
    const fetchUserData = async () => {
      console.log('dada')
      const response = await fetch('http://localhost:2525/api/user', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        console.log('data:', data)
        setUser(data);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;
