"use client";

import { ReactNode, useState, useEffect } from 'react';
import { CurrentUserContext, CurrentUserContextType } from './CurrentUserContext';

interface CurrentUserProviderProps {
  children: ReactNode;
}

export default function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  // Start with false - user needs to login
  const [logged, setLogged] = useState(false); 

  // Load login state from localStorage on mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem('userLoggedIn');
    if (savedLoginState === 'true') {
      setLogged(true);
    }
  }, []);

  // Save login state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userLoggedIn', logged.toString());
  }, [logged]);

  const contextValue: CurrentUserContextType = {
    logged,
    setLogged,
  };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
