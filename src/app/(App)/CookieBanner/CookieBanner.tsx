'use client'
import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      width: '80%',
      position: 'fixed',
      border: 'solid black 1px',
      bottom: '20px',
      left: '12%',
      background: 'rgba(255, 255, 255, 0.6)',
      opacity: 0.8,
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1000,
      }}>
    <p className='italic'>We are using cookies for a better feeling on this website.</p>
    <button onClick={handleAccept} style={{marginTop: '10px'}} className='btn btn-outline-black btn-primary'>Accept Cookies</button>
  </div>
  );
};

export default CookieBanner;
