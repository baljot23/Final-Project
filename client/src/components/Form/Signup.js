import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setError("");
      setLoading(true);
      await signup(email, password);

      navigate("/");
    } catch {
      setError("Failed to create an account ");
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        <h2>Sign Up</h2>
        {error && <alert>{error}</alert>}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {" "}
            Sign Up
          </button>
        </form>
      </div>

      <div>
        Already have an account? <Link to="/login">Log In</Link>{" "}
      </div>
    </>
  );
};

export default Signup;
