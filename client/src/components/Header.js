import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Marvel from "../Pictures/Marvel4.jpg";

const Header = () => {
  return (
    <>
      {/* <Wrapper>
        <MarvelBannerImage src={Marvel} />
      </Wrapper> */}
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
  width: 50vw;
  height: 50vh;
`;

const MarvelBannerImage = styled.img`
  height: 50vh;
  width: 100vw;
  position: relative;
  object-fit: cover;
`;
const Navigation = styled.ul`
  text-decoration: none;
  background-color: black;
  display: flex;
  width: 100%;
  height: 50px;
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
