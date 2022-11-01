import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { blogdata } from './blogdata';
import useLocalStorage from './useLocalStorage';

const adminList = ["Leonardo", "Fabrizio", "Skiva7"]
const creatorList = ["Rosa", "Ana", "Yuli"]
const editorList = ["Elpepe", "Eldiego", "Eljose"]

const roles = [
  { role: "admin", update: true, delete: true },
  { role: "creator", update: false, delete: true },
  { role: "editor", update: true, delete: false },
  { role: "default", update: false, delete: false },
];

//utils
const slugify = (string) => {
  return string.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};
const addRole = (username) => {
  const isAdmin = adminList.find(admin => admin === username);
  const isCreator = creatorList.find(creator => creator === username);
  const isEditor = editorList.find(editor => editor === username);
  if(isAdmin) return roles[0];
  if(isCreator) return roles[1];
  if(isEditor) return roles[2];
  return roles[3];
};


const AuthContext = createContext();

function AuthProvider({children}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = ({ username }) => {
    setUser({ 
      username,
      ...addRole(username)
    } );
    navigate('/profile');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  ////////////////////
  // useEffect(() => {
  //   return {
  //     item: blogs,
  //     saveItem: saveBlogs,
  //   } = useLocalStorage('Blogs_V1', []);
  // }, [])

  // // const {
  // //   item: blogs,
  // //   saveItem: saveBlogs,
  // // } = useLocalStorage('Blogs_V1', []);

  // console.log(blogs);


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