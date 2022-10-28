import React from "react";
import { useState } from "react";
import { useAuth } from "./auth";

function LoginPage() {
  const auth = useAuth();
  const [username, setUsername] = useState("");

  const login = (e) => {
    e.preventDefault();
    auth.login({username});
  };

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
