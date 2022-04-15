import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ComicCharacterContext = createContext(null);

const ComicCharacterProvider = ({ children }) => {
  // const [characterId, setCharacterId] = useState();

  // const { id } = useParams();

  // useEffect(() => {
  //   fetch(`/character/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setCharacterId(data?.data);
  //     });
  // }, []);

  // console.log(characterId);

  return (
    <ComicCharacterContext.Provider value={{}}>
      {children}
    </ComicCharacterContext.Provider>
  );
};

export default ComicCharacterProvider;
