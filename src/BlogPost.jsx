import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./auth";

function BlogPost() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { blogs, user , openModeEditBlog, deleteBlog} = useAuth();
  const blogpost = blogs.find((post) => post.slug === slug);
  console.log(blogpost);

  const canDelete = user?.delete || blogpost?.author === user?.username;
  const canEdit = user?.update;

  const onOpenEdit = () => {
    openModeEditBlog(blogpost.id);
  }
  const onDelete = () => {
    deleteBlog(blogpost.id);
  }

  const returnToBlog = () => {
    navigate("/blog");
  };
  return (
    <>
      {blogpost && (
        <>
          <h2>{blogpost.title}</h2>
          <button onClick={returnToBlog}>Volver a BlogPage</button>
          <p>{blogpost.author}</p>
          <p>{blogpost.content}</p>
        </>
      )}

      {canDelete && <button onClick={onDelete}>Eliminar blogpost</button>}
      {canEdit && <button onClick={onOpenEdit}>Editar blogpost</button>}
    </>
  );
}

export default BlogPost;
