import React from "react";
import { useAuth } from "./auth";

function PostForm() {
  const {} = useAuth();
  
  return (
    <form>
      <label>
        <p>Ingresar el titulo del post:</p>
        <input type="text" placeholder="¿Qué es React?" />
        {/* <p>Ingresar el nombre del autor:</p>
        <input type="text" placeholder='¿Qué es React?'/> */}
      </label>
      <label>
        <p>Redactar el contenido del post:</p>
        <input type="text" placeholder="¿Qué es React?" />
      </label>
    </form>
  );
}

export default PostForm;
