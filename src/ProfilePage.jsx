import React from "react";
import { useAuth } from "./auth";

function ProfilePage() {
  const {user} = useAuth();
  return (
    <>
      <h1>Profile</h1>
      <p>
        Welcome, {user?.username} {user?.role}
      </p>
      {}
    </>
  );
}

export default ProfilePage;
