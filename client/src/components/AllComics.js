import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Comics = () => {
  const [comics, setComics] = useState();

  const [offset, setOffset] = useState(100);

  useEffect(() => {
    fetch("/comics/0")
      .then((res) => res.json())
      .then((data) => {
        setComics(data?.data);
      });
  }, []);

  useEffect(() => {
    fetch(`/comics/${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setComics([...comics, ...data?.data]);
      });
  }, [offset]);

  return (
    <>
      <div>
        <div>Comics from A-Z:</div>
        <Container>
          {comics?.map((comic) => {
            console.log(comic);
            return (
              <ComicContainer>
                <ImageContainer to={`/comics/${comic?.id}`}>
                  <ComicImage
                    src={
                      comic.thumbnail?.path + "." + comic.thumbnail?.extension
                    }
                  />
                </ImageContainer>
                <ComicId>Id: {comic?.id}</ComicId>
                <ComicTitle>{comic?.title}</ComicTitle>
              </ComicContainer>
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
    </>
  );
};
const ComicContainer = styled.div`
  width: 250px;
  height: 380px;
  border: 3px solid black;
`;

const ImageContainer = styled(Link)`
  object-fit: cover;
  width: 100%;
`;

const ComicImage = styled.img`
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

const ComicId = styled.div`
  padding-top: 15px;
`;
const ComicTitle = styled.div`
  padding-top: 15px;
  text-align: center;
`;

export default Comics;
