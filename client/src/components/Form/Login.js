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
      navigate("/home");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#c7ceea",
          height: "100vh",
          width: "100vw;",
        }}
      >
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
            <SignUp>
              Need an account? <Link to="/">Sign Up</Link>
            </SignUp>
          </Container>
        </Wrapper>
      </div>
    </>
  );
};
const Wrapper = styled.div`
  height: 30vh;
  width: 5%;
  display: flex;
  flex-direction: column;
  margin-left: 30%;
  padding: 10%;
`;

const Container = styled.div`
  border: 3px solid black;
  width: 20vw;
`;

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
  padding-top: 10px;
  text-align: center;
  font-weight: bold;
`;
const LoginButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px;
  margin-left: 25%;
  width: 50%;
  height: 40px;
  background-color: black;
  color: white;
`;
const SignUp = styled.div`
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const Forgotpassword = styled.div`
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
`;
export default Login;
