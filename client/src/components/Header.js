import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Marvel from "../Pictures/Marvel2.jpg";

const Header = () => {
  return (
    <>
      <Wrapper>
        <MarvelBannerImage src={Marvel} />
      </Wrapper>
      <Navigation>
        <li>
          <StyledLink to="/home">Marvel</StyledLink>
        </li>
        <li>
          <StyledLink to="/profile">Profile</StyledLink>
        </li>
        <li>
          <StyledLink to="/characters">Characters</StyledLink>
        </li>
        <li>
          <StyledLink to="/comics">Comics</StyledLink>
        </li>
        <li>
          <StyledLink to="/series">Series</StyledLink>
        </li>
      </Navigation>
    </>
  );
};

const Wrapper = styled.div`
  height: 50vh;
  background-color: black;
`;

const MarvelBannerImage = styled.img`
  height: 50vh;
  width: 100vw;
  position: absolute;
  object-fit: contain;
`;
const Navigation = styled.ul`
  text-decoration: none;
  background-color: black;
  display: flex;
  width: 100%;
  height: 40px;
  padding-top: 10px;
  justify-content: center;
`;

const StyledLink = styled(NavLink)`
  padding: 100px;
  text-decoration: none;
  color: white;
  font-size: 20px;
`;
export default Header;
