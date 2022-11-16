import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./auth";
import "./PostForm.css"
function PostForm() {

  const {
    user,
    openFormBlog,
    setOpenFormBlog,
    editFormStatus,
    setEditFormStatus,
    blogEdit: blog,
    addBlog,
    editBlog,
  } = useAuth();
  
  const status = editFormStatus ? "Editar" : "Agregar";
  const inputRefTitle = useRef();
  const inputRefContent = useRef();
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [author, setAuthor] = useState(user?.username || "");
  // ojo con el error content o title?
  const [error, setError] = useState(blog?.content || false);


  // focus en el input title
  useEffect(() => {
    setTimeout(() => {
      if (inputRefTitle.current) {
        inputRefTitle.current.focus();
      }
    }, 100);
  }, [openFormBlog]);

  //
  React.useEffect(() => {
    if (!!blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setError(false); // si funciona
    }
  }, [blog]);

  // funcion independiente
  const validate = (valueTitle, valueContent) => {
    if (!valueTitle) {
      inputRefTitle.current.focus();
      setTitle(valueTitle);
      setError(true);
      return false;
    } 
    else if (!valueContent) {
      inputRefContent.current.focus();
      setTitle(valueContent);
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };


  // fUNCION PARA EL IMPUT
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    // setError(false);
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
    // setError(false);
  };
  // Funcion para el boton "cancelar"
  const onCancel = () => {
    setOpenFormBlog(false);
    // setError(false);
  };

  const onCreate = () => {
    if(validate(title, content)) {
      addBlog(title, author, content);
      setTitle("");
      setContent("");
      setOpenFormBlog(false);
    }
  }
  const onEditSubmit = () => {
    if(validate(title, content)) {
      const editedBlog = {
        ...blog,
        title,
        content,
      };

      editBlog(editedBlog);
      setTitle("");
      setContent("");
      setEditFormStatus(false);
      setOpenFormBlog(false);
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (!editFormStatus) onCreate();
    else onEditSubmit();
    //setEditFormStatus(false);
  };

  return (
    <form className={`BlogForm ${openFormBlog ? "BlogForm--open": ""}`} onSubmit={onSubmit}>
      <label>
        <p>{status} el titulo del post:</p>
        <input 
        ref={inputRefTitle}
        type="text" 
        placeholder="¿Qué es React?" 
        value={title}
        onChange={onChangeTitle}
        />
        {/* <p>Ingresar el nombre del autor:</p>
        <input type="text" placeholder='¿Qué es React?'/> */}
      </label>
      <label>
        <p>{status} el contenido del post:</p>
        <input 
        ref={inputRefContent}
        type="text" 
        placeholder="¿Qué es React?" 
        value={content}
        onChange={onChangeContent}
        />
      </label>
      <div>
        <button type="button" onClick={onCancel}>Cancelar</button>
        <button type="submit">{status}</button>
      </div>
    </form>
  );
}

export default PostForm;
