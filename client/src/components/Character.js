import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { AuthContext } from "./Form/AuthContext";
import CommentPost from "./CommentPost";

const Character = () => {
  const [singleCharacter, setSingleCharacter] = useState();
  const [user, setUser] = useState(false);
  const [reload, setReload] = useState(false);
  const [docRef, setDocRef] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleCharacter(data?.data);
      });
  }, []);

  const colRef = collection(db, "users");

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      let likedbyUsers = [];

      snapshot.docs.forEach((document) => {
        if (document.data().CharacterId === id) {
          setDocRef(doc(db, "users", document.id));
          likedbyUsers.push(document.data().likedBy);
        }
      });
      setUser([...likedbyUsers]);
    });
  }, [reload]);

  console.log(docRef);

  const handleLike = () => {
    setReload(!reload);
    if (!user?.includes(currentUser.uid)) {
      addDoc(colRef, {
        CharacterId: id,
        likedBy: currentUser.uid,
        displayName: "",
      }).then((e) => {});
    } else {
      deleteDoc(docRef).then((e) => {});
    }
  };

  const handleComment = () => {
    setReload(!reload);
    addDoc(colRef, {});
  };

  return (
    <>
      <div>
        {singleCharacter?.map((character) => {
          return (
            <>
              <div>
                <ComicCharacterLink to={`/character/comic/${character?.id}`}>
                  <CharacterImage
                    src={
                      character?.thumbnail?.path +
                      "." +
                      character?.thumbnail?.extension
                    }
                  />

                  <div>Character Name: {character?.name}</div>
                  <div>Id: {character?.id}</div>
                  <div>{character?.description}</div>
                </ComicCharacterLink>

                <ul>
                  {character?.comics?.items.map((comics) => {
                    return <li>{comics?.name}</li>;
                  })}
                </ul>
                <button onClick={() => handleLike()}>
                  <FcLike />
                  Like this charater
                </button>
                <CommentPost />
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
