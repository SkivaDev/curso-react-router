import React from 'react';
import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';


function useBlogs() {

  const {
    item: blogs,
    saveItem: saveBlogs,
  } = useLocalStorage('Blogs_V1', []);
  
  const [openFormBlog, setOpenFormBlog] = useState(false);

  //utils
  const slugify = (string) => {
    return string.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  const roles = [
    { role: "admin", update: true, delete: true },
    { role: "creator", update: true, delete: true },
    { role: "editor", update: true, delete: false },
  ];

  const addBlog = (title, autor, content) => {
    const newBlogs = [...blogs];
    const id = Math.floor(Math.random() * 999999);
    newBlogs.push({
      id: id,
      title,
      slug: id + "-" + slugify(title),
      content,
      autor,
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
  
  return {
    addBlog,
    editBlog,
    deleteBlog,
    openFormBlog,

  };
}

export default useBlogs;

// AD A NEW ADVANCE AFTER EACH DAY 
// BEFORE I WAS LISTENING A STRAING MUSIC I never listened before 
// So we need to start this task to can finishing 