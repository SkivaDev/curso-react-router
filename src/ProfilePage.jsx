import React from "react";
import { useAuth } from "./auth";

function ProfilePage() {
  const auth = useAuth();
  return (
    <>
      <h1>Profile</h1>
      <p>
        {auth.user.username ? "Welcome " + auth.user.username : "Necesita logearse"}
      </p>
    </>
  );
}

export default ProfilePage;
