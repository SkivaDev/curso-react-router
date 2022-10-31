import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from './auth'
import { blogdata } from './blogdata'


function BlogPage() {
  // const auth = useAuth();
  const {blogs, user} = useAuth();

  return (
    <>
      <h1>BLOG</h1>
      <Outlet />
      <ul>
        {blogs.map(post => (
          <BlogLink key={post.slug} post={post} />
        ))}
      </ul>
      {user && (
        <button>Publicar un nuevo BlogPost</button>
      )}
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