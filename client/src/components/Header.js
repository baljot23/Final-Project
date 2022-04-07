import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      {" "}
      <Gif
        height="200%"
        width="100%"
        src="https://giphy.com/embed/3GnKKEw2v7bXi"
        allowfullscreen=""
      ></Gif>
      <Navigation>
        <li>
          <StyledLink to="/">Marvel</StyledLink>
        </li>
        <li>
          <StyledLink to="/profile">Profile</StyledLink>
        </li>
        <li>
          <StyledLink to="/characters">Chracters</StyledLink>
        </li>
        <li>
          <StyledLink to="/comics">Comics</StyledLink>
        </li>
        <li>
          <StyledLink to="/series">Series</StyledLink>
        </li>
      </Navigation>{" "}
    </>
  );
};

const Navigation = styled.ul`
  text-decoration: none;
  background-color: lightgray;
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: -3px;
  padding-top: 30px;
  justify-content: center;
`;

const Gif = styled.iframe`
  background-color: #cc0f0f;
  padding: 0;
`;

const StyledLink = styled(NavLink)`
  padding: 100px;
  text-decoration: none;
  color: white;
  font-size: 20px;
`;
export default Header;
