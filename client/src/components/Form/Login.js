import { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };
  return (
    <>
      <div>
        <h2>Log In</h2>
        {error && <alert>{error}</alert>}
        <form onSubmit={handleSubmit}>
          <label>UserName</label>
          <input type="username" ref={usernameRef} required />

          <label>Email</label>
          <input type="email" ref={emailRef} required />

          <label>Password</label>
          <input type="password" ref={passwordRef} required />

          <button type="submit" disabled={loading}>
            {" "}
            Log In
          </button>
        </form>
      </div>

      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
