import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Favorite from "./Favorite/Favorite";
import { FcLike } from "react-icons/fc";

const Character = () => {
  const [singleCharacter, setSingleCharacter] = useState();

  const { id } = useParams();

  useEffect(() => {
    fetch(`/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleCharacter(data.data);
      });
  }, []);

  return (
    <>
      <div>
        {singleCharacter?.map((character) => {
          return (
            <>
              <div>
                <ComicCharacterLink to={`/character/comic/${character.id}`}>
                  <CharacterImage
                    src={
                      character.thumbnail?.path +
                      "." +
                      character.thumbnail?.extension
                    }
                  />
                  <FcLike />
                  <div>{character.name}</div>
                  <div>{character.id}</div>
                  <div>{character.description}</div>
                </ComicCharacterLink>
                <ul>
                  {character.comics.items.map((comics) => {
                    return <li>{comics.name}</li>;
                  })}
                </ul>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

const ComicCharacterLink = styled(Link)``;

const CharacterImage = styled.img`
  height: auto;
  max-height: 250px;
  width: auto;
  max-width: 250px;
`;

const SeriesLink = styled(Link)``;

export default Character;
