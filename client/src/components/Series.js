import { useEffect, useState } from "react";
const Movies = () => {
  const [series, setSeries] = useState();

  const [offset, setOffset] = useState(100);

  useEffect(() => {
    fetch("/series/0")
      .then((res) => res.json())
      .then((data) => {
        setSeries(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`/series/${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setSeries([...series, ...data.data]);
      });
  }, [offset]);

  console.log(series);
  return (
    <div>
      {series?.map((series) => {
        return <div>{series.title}</div>;
      })}
      <button
        onClick={() => {
          setOffset(offset + 100);
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default Movies;
