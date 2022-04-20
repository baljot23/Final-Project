import { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { restPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await restPassword(emailRef.current.value);
      setMessage("Check your inbox for futrher instructions");
    } catch {
      setError("Failed to rest password");
    }
    setLoading(false);
  };
  return (
    <>
      <div>
        <h2>Password Reset</h2>
        {error && <alert>{error}</alert>}
        {message && <alert>{message}</alert>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" ref={emailRef} required />

          <button type="submit" disabled={loading}>
            Rest Password
          </button>
        </form>
        <div>
          <Link to="/login">Log In</Link>
        </div>
      </div>

      <div>
        Need an account? <Link to="/">Sign Up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
