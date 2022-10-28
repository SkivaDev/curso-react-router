import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const AuthContext = createContext();

function AuthProvider({children}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = ({ username }) => {
    setUser({ username });
    navigate('/profile');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const auth = {user, login, logout}

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

function AuthRoute(props) {
  const auth = useAuth();

  if(!auth.user) {
    return <Navigate to='/login'/>
  }
  return props.children;
}

export {
  AuthProvider,
  useAuth,
  AuthRoute,
};