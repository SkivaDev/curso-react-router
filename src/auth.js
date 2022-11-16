import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
//import { useLocalStorage } from './useLocalStorage.jsx';

const adminList = ["Leonardo", "Fabrizio", "Skiva7"]
const creatorList = ["Rosa", "Ana", "Yuli"]
const editorList = ["Elpepe", "Eldiego", "Eljose"]

const roles = [
  { role: "admin", update: true, delete: true },
  { role: "creator", update: true, delete: true },
  { role: "editor", update: true, delete: false },
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
};


const AuthContext = createContext();

function AuthProvider({children}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = ({ username }) => {
    setUser({ username, ...addRole(username)} );
    navigate('/profile');
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  ////////////////////
  const {
    item: blogs,
    saveItem: saveBlogs,
  } = useLocalStorage('Blogs_V1', []);
  
  const [openFormBlog, setOpenFormBlog] = useState(false);
  const [blogEdit, setBlogEdit] = useState("")
  const [editFormStatus, setEditFormStatus] = useState(false);

  const addBlog = (title, author, content) => {
    const newBlogs = [...blogs];
    const id = new Date().getTime().toString();
    newBlogs.push({
      id: id,
      title,
      slug: id + "-" + slugify(title),
      content,
      author,
    });
    saveBlogs(newBlogs);
  };

  const editBlog = (blog) => {
    const newBlogs = blogs.map((t) => {
      if (t.id === blog.id) {
        return blog;
      }
      return t;
    });
    saveBlogs([...newBlogs]);
    setOpenFormBlog(false);
  }

  const deleteBlog = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    saveBlogs(newBlogs);
  };

  // Identifica el todo en el que se hizo click edit y abre el modal
  // onEdit (todolist para todoItem)
  const openModeEditBlog = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    setBlogEdit(blog);
    if(blog) {
      setOpenFormBlog(true);
      setEditFormStatus(true);
    }
  }



  /////////////
  const auth = {
    user, 
    login, 
    logout,


    blogs,
    addBlog,
    editBlog,
    deleteBlog,
    openFormBlog,
    setOpenFormBlog,
    openModeEditBlog,
    setEditFormStatus,
    editFormStatus,
    blogEdit,
  };
  ///////////
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