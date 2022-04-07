import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comic = () => {
  const [singleComic, setSingleComic] = useState();

  const { id } = useParams();

  useEffect(() => {
    fetch(`/comics/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSingleComic(data.data);
      });
  }, []);

  console.log(singleComic);

  return (
    <>
      <div>
        {singleComic?.map((comic) => {
          console.log(comic);
          return (
            <>
              <img
                src={comic.images[0].path + "." + comic.images[0].extension}
              />
              <div>Id: {comic.id}</div>
              <div>Description: {comic.description}</div>
              <div>Series: {comic.series.name}</div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Comic;
