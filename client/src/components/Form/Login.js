import { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
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
      <Wrapper>
        <Container>
          <LogIn>Log In</LogIn>
          {error && <alert>{error}</alert>}
          <form onSubmit={handleSubmit}>
            <SubContainer>
              <Label>Email</Label>
              <input type="email" ref={emailRef} required />
            </SubContainer>{" "}
            <SubContainer>
              <Label>Password</Label>
              <input type="password" ref={passwordRef} required />
            </SubContainer>
            <LoginButton type="submit" disabled={loading}>
              Log In
            </LoginButton>
          </form>
          <Forgotpassword>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Forgotpassword>
        </Container>

        <SignUp>
          Need an account? <Link to="/">Sign Up</Link>
        </SignUp>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  border: 3px solid black;
  height: 30vh;
  width: 5%;
  display: flex;
  flex-direction: column;
  margin-left: 35%;
  margin-top: 5%;
  padding: 10%;
`;

const Container = styled.div``;

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  margin: 20px 15px 20px 0px;

  padding: 20px 5px 10px 0px;
`;

const LogIn = styled.h2`
  text-align: center;
`;
const LoginButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px;
  margin-left: 15%;
  width: 100%;
  height: 40px;
  background-color: black;
  color: white;
`;
const SignUp = styled.div`
  text-align: center;
  margin-top: 15px;
  margin-left: 10px;
`;

const Forgotpassword = styled.div`
  text-align: center;
  margin-top: 15px;
  margin-left: 10px;
`;
export default Login;
