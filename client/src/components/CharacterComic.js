import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Comic = () => {
  const [characterComic, setCharacterComic] = useState();

  const { id } = useParams();

  useEffect(() => {
    fetch(`/character/comic/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacterComic(data.data);
      });
  }, []);

  return (
    <>
      <div>
        {characterComic?.map((comic) => {
          return (
            <>
              <div>
                {comic.images.map((image) => {
                  return (
                    <>
                      <CharacterImage
                        src={image.path + "." + image.extension}
                      />
                    </>
                  );
                })}
              </div>{" "}
              <div>Title: {comic.title}</div>
              <div>Description: {comic.description}</div>
              <div>Series: {comic.series.name}</div>
            </>
          );
        })}
      </div>
    </>
  );
};

const CharacterImage = styled.img`
  height: auto;
  max-height: 250px;
  width: auto;
  max-width: 250px;
`;

export default Comic;
