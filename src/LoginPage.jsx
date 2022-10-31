import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

function LoginPage() {
  const auth = useAuth();
  const [username, setUsername] = useState("");

  const login = (e) => {
    e.preventDefault();
    auth.login({username});
    console.log(username, " ", auth.user);
  };

  if(auth.user) {
    return <Navigate to="/profile"/>
  }

  return (
    <>
      <h1>LoginPage</h1>

      <form onSubmit={login}>
        <label>Ingresa tu nombre de usuario</label>
        <input
         type="text"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

export default LoginPage;
