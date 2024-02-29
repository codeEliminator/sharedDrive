'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = { 
  name: string; 
  id: string; 
  role: string; 
  email: string; 
  password: string;
  phoneNumber: string;
};

export type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: ()=>{},
});

export let useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
