import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const Characters = () => {
  const [characters, setCharacters] = useState();
  const [offset, setOffset] = useState(100);

  useEffect(() => {
    fetch("/characters/0")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`/characters/${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters([...characters, ...data.data]);
      });
  }, [offset]);

  return (
    <div>
      <div>Characters from A-Z:</div>
      <Container>
        {characters?.map((character) => {
          return (
            <CharacterContainer>
              <ImageContainer to={`/character/${character.id}`}>
                <CharacterImage
                  src={
                    character.thumbnail?.path +
                    "." +
                    character.thumbnail?.extension
                  }
                />
              </ImageContainer>
              <CharacterId>Id: {character.id}</CharacterId>
              <CharacterName>{character.name}</CharacterName>
            </CharacterContainer>
          );
        })}
      </Container>
      <button
        onClick={() => {
          setOffset(offset + 100);
          console.log(offset);
        }}
      >
        Load More
      </button>
    </div>
  );
};

const CharacterContainer = styled.div`
  width: 250px;
  height: 380px;
  border: 3px solid black;
`;

const ImageContainer = styled(Link)`
  object-fit: cover;
  width: 100%;
`;

const CharacterImage = styled.img`
  height: auto;
  max-height: 250px;
  width: auto;
  max-width: 250px;
`;
const Container = styled.div`
  padding: 50px;
  display: grid;
  grid-gap: 50px;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
`;

const CharacterId = styled.div`
  padding-top: 15px;
`;
const CharacterName = styled.div`
  padding-top: 15px;
  text-align: center;
`;

export default Characters;
