import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
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
          <label>UserName</label>
          <input type="username" ref={usernameRef} required />
          <label>Email</label>
          <input type="email" ref={emailRef} required />

          <label>Password</label>
          <input type="password" ref={passwordRef} required />

          <label>Password Confirmation</label>
          <input type="password" ref={passwordConfirmRef} required />
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
