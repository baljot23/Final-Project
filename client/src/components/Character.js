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
            document.data().comments.forEach((eachComment) => {
              likedbyUsers.push(eachComment.id);
            });
        }
      });

      setUser([...likedbyUsers]);
    });
  }, [reload]);

  const handleLike = () => {
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
            updateDoc(documentRef, {
              likedBy: {
                id: currentUser.uid,
                UserName: currentUser.displayName,
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
                UserName: currentUser.displayName,
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
      addDoc(colRef, {
        CharacterId: id,
        UserId: currentUser.uid,
        likedBy: {
          id: currentUser.uid,
          UserName: currentUser.displayName,
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
              {character ? (
                <div>
                  <ComicCharacterLink to={`/character/comic/${character?.id}`}>
                    <CharacterImage
                      src={
                        character?.thumbnail?.path +
                        "." +
                        character?.thumbnail?.extension
                      }
                    />
                  </ComicCharacterLink>
                  <InfoContainer>
                    <div>Character Name: {character?.name}</div>
                    <div>Id: {character?.id}</div>
                    <div>{character?.description}</div>
                    <ul>
                      {character?.comics?.items.map((comics) => {
                        return <li>{comics?.name}</li>;
                      })}
                    </ul>
                  </InfoContainer>
                  <Button onClick={() => handleLike()}>
                    <FcLike />
                    Like this charater
                  </Button>
                  <CommentPost singleCharacter={singleCharacter} />
                </div>
              ) : (
                <Loader></Loader>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

const Button = styled.button`
  height: auto;
  max-height: 250px;
  width: 15%;
  margin: 100px 50px 0px 50px;
`;
const InfoContainer = styled.div`
  height: auto;
  max-height: 250px;
  width: 50%;
  margin: 50px;
`;
const ComicCharacterLink = styled(Link)``;

const CharacterImage = styled.img`
  height: auto;
  max-height: 250px;
  max-width: 250px;
  width: 320px;
  border: 1px solid lightblue;
  margin: 50px;
  display: flex;
  flex-direction: row;
`;

const Loader = styled.div`
  border: 10px solid black;
  border-top: 10px solid blue;
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
  margin-left: 40%;
  margin-top: 10%;
`;

const SeriesLink = styled(Link)``;

export default Character;
