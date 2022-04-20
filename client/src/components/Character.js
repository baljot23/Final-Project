import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";
import { AuthContext } from "./Form/AuthContext";
import CommentPost from "./CommentPost";

const Character = () => {
  const [singleCharacter, setSingleCharacter] = useState();
  const [user, setUser] = useState([]);
  const [reload, setReload] = useState(true);
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

  const CharacterName = singleCharacter?.map((Character) => {
    return Character.name;
  });

  const CharacterImg = singleCharacter?.map((Character) => {
    return Character?.thumbnail?.path + "." + Character?.thumbnail?.extension;
  });

  const colRef = collection(db, "users");

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      let likedbyUsers = [];

      snapshot.docs.forEach((document) => {
        if (document.data().CharacterId === id) {
          setDocRef(doc(db, "users", document.id));
          document.data().likedBy &&
            likedbyUsers.push(document.data().likedBy.id);
          document.data().comments &&
            likedbyUsers.push(document.data().comments.id);
        }
      });

      setUser([...likedbyUsers]);
    });
  }, [reload]);

  const handleLike = () => {
    console.log(user);
    setReload(!reload);
    if (user?.includes(currentUser.uid)) {
      getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((document) => {
          const documentRef = doc(db, "users", document.id);

          if (
            document.data().CharacterId === id &&
            document.data().comments &&
            document.data().likedBy
          ) {
            console.log(document.data().likedBy.isLiked);
            updateDoc(documentRef, {
              likedBy: {
                id: currentUser.uid,
                isLiked: !document.data().likedBy.isLiked,
                CharacterName,
                CharacterImg,
              },
            });
          } else if (
            document.data().CharacterId === id &&
            !document.data().likedBy
          ) {
            updateDoc(documentRef, {
              likedBy: {
                id: currentUser.uid,
                isLiked: true,
                CharacterName,
                CharacterImg,
              },
            }).then((e) => {
              console.log("liked");
            });
          }
        });
      });
    } else {
      console.log("here");
      addDoc(colRef, {
        CharacterId: id,
        likedBy: {
          id: currentUser.uid,
          isLiked: true,
          CharacterName,
          CharacterImg,
        },
      }).then((e) => {
        console.log("liked");
      });
    }
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
