import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from './auth'
import { blogdata } from './blogdata'
import PostForm from './PostForm';

function BlogPage() {
  // const auth = useAuth();
  const {
    blogs, 
    user,
    openFormBlog, 
    setOpenFormBlog} = useAuth();

  const onOpenForm = () => {
    setOpenFormBlog(true);
  }

  return (
    <>
      <h1>BLOG</h1>
      <Outlet />
      <ul>
        {blogs.map(post => (
          <BlogLink key={post.slug} post={post} />
        ))}
      </ul>
      {user && !openFormBlog && (
        <button onClick={onOpenForm}>Publicar un nuevo BlogPost</button>
      )}
      <PostForm />
    </>
  )
}

function BlogLink({ post }){
  return (
    <li>
      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
    </li>
  )
}



export default BlogPage;