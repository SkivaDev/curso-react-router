import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { blogdata } from './blogdata'

function BlogPost() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const blogpost = blogdata.find(post => post.slug === slug);
  console.log(blogpost);

  const returnToBlog = () => {
    navigate('/blog');
  }
  return (
    <>
      <h2>{blogpost.title}</h2>
      <button onClick={returnToBlog}>Volver a BlogPage</button>
      <p>{blogpost.author}</p>
      <p>{blogpost.content}</p>
    </>
  )
}

export default BlogPost