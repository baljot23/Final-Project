import React from "react";
import { useState } from "react";
import { useAuth } from "./Form/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <div>
        <h2>Profile</h2>
        {error && <alert>{error}</alert>}
        <div>Email: {currentUser?.email}</div>
        <div>id: {currentUser?.uid}</div>
        <div>Name: {currentUser?.displayName}</div>
      </div>
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </>
  );
};

export default Profile;
