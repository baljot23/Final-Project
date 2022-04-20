import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Comic from "../../Pictures/ComicCity.webp";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username, photoURL);
      navigate("/home");
    } catch {
      setError("Failed to create an account ");
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
          {" "}
          <Container>
            <SignUp>Sign Up</SignUp>
            {error && <alert>{error}</alert>}
            <form onSubmit={handleSubmit}>
              <SubContainer>
                <Label>Name</Label>
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </SubContainer>
              <SubContainer>
                <Label>Email</Label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </SubContainer>
              <SubContainer>
                <Label>Password</Label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </SubContainer>
              <SignupButton type="submit" disabled={loading}>
                {" "}
                Sign Up
              </SignupButton>
            </form>
            <Login>
              Already have an account? <Link to="/login">Log In</Link>{" "}
            </Login>
          </Container>
        </Wrapper>{" "}
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

const SignUp = styled.h2`
  padding-top: 10px;
  text-align: center;
  font-weight: bold;
`;
const SignupButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px;
  margin-left: 25%;
  width: 50%;
  height: 40px;
  background-color: black;
  color: white;
`;
const Login = styled.div`
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
`;
export default Signup;
