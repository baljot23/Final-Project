import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Marvel from "../Pictures/marvel.png";
import { Link } from "react-router-dom";
import { css } from "styled-components";

const HomePage = () => {
  const [mostRecent, setMostRecent] = useState();
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    fetch("/api/characters/recent")
      .then((res) => res.json())
      .then((data) => {
        setMostRecent(data?.data);
      });
  }, []);

  console.log(mostRecent);

  return (
    <>
      {mostRecent ? (
        <Wrapper>
          <AllCharacters> Most Recent Characters:</AllCharacters>
          <Container>
            {mostRecent?.map((character) => {
              let imgSrc;
              if (character.thumbnail.path.includes("not")) {
                imgSrc = Marvel;
              } else {
                imgSrc =
                  character.thumbnail?.path +
                  "." +
                  character?.thumbnail?.extension;
              }
              return (
                <>
                  <CardContainer to={`/character/${character?.id}`}>
                    <CardInner className={!flipped ? "flipped" : ""}>
                      <CardFront>
                        <CharacterId>Id:{character?.id}</CharacterId>
                        <CharacterName>{character?.name}</CharacterName>{" "}
                        <CharacterModified>
                          Modified Since:{character?.modified}
                        </CharacterModified>
                      </CardFront>
                      <CardBack>
                        <ImageContainer>
                          <CharacterImage src={imgSrc} />
                        </ImageContainer>
                      </CardBack>
                    </CardInner>
                  </CardContainer>
                </>
              );
            })}{" "}
          </Container>
        </Wrapper>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};
const Loader = styled.div`
  border: 10px solid #c586c0;
  border-top: 10px solid red;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  margin-left: 50%;
  margin-top: 10%;
`;
const AllCharacters = styled.div`
  text-align: left;
  font-size: 20px;
  padding-top: 10px;
  padding-left: 45px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const CharacterImage = styled.img`
  height: auto;
  max-height: 250px;
  width: auto;
  max-width: 250px;
`;

const CharacterModified = styled.div`
  margin-bottom: 10px;
`;

const CardContainer = styled(Link)`
  width: 250px;
  height: 380px;
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  transition: z-index 500ms, transform 500ms;
  z-index: 0;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  transform-style: preserve-3d;

  ::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
    box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
    z-index: -1;
    -webkit-animation-name: gradient-shadow;
    animation-name: gradient-shadow;
    -webkit-animation-timing-function: ease;
    animation-timing-function: ease;
    -webkit-animation-duration: 10s;
    animation-duration: 10s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  @keyframes gradient-shadow {
    0% {
      -webkit-box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
      box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
    }
    20% {
      -webkit-box-shadow: 0 0 17px 3px #0ff, 0 0 4px 2px #0ff;
      box-shadow: 0 0 17px 3px #0ff, 0 0 4px 2px #0ff;
    }
    40% {
      -webkit-box-shadow: 0 0 17px 3px #0f0, 0 0 4px 2px #0f0;
      box-shadow: 0 0 17px 3px #0f0, 0 0 4px 2px #0f0;
    }
    60% {
      -webkit-box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
      box-shadow: 0 0 17px 3px #ffff01, 0 0 4px 2px #ffff01;
    }
    80% {
      -webkit-box-shadow: 0 0 17px 3px #f00, 0 0 4px 2px #f00;
      box-shadow: 0 0 17px 3px #f00, 0 0 4px 2px #f00;
    }
    100% {
      -webkit-box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
      box-shadow: 0 0 17px 3px #c586c0, 0 0 4px 2px #c586c0;
    }
  }

  &.flipped:hover {
    z-index: 0;
  }
`;
const CardSide = css`
  width: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid black;
`;
const CardBack = styled.div`
  ${CardSide}
  z-index: 1;
  position: absolute;
  height: 100%;
  background-color: white;
`;
const CardFront = styled.div`
  ${CardSide}
  background-color:white;
  transform: rotateY(-180deg);
  z-index: 1;
`;
const CardInner = styled.div`
  flex: 1;
  display: flex;
  transition: transform 500ms;
  transform-style: preserve-3d;
  &.flipped:hover {
    transform: rotateY(-180deg);
  }
`;

const ImageContainer = styled.div`
  object-fit: cover;
  width: 100%;
`;

const Container = styled.div`
  padding: 50px;
  display: grid;
  grid-gap: 200px;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
`;

const CharacterId = styled.div`
  margin-top: 50%;
`;
const CharacterName = styled.div`
  margin-bottom: 50%;
`;

export default HomePage;
