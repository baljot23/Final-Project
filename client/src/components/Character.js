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
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { AuthContext } from "./Form/AuthContext";
import CommentPost from "./CommentPost";

const Character = () => {
  const [singleCharacter, setSingleCharacter] = useState();
  const [comment, setComment] = useState("");
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

  const colRef = collection(db, "users");

  const handleUnlike = () => {
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((document) => {
        const documentRef = doc(db, "users", document.id);
        const likedArr = document
          .data()
          .likedbyUsers.filter((id) => currentUser.uid !== id);
        if (document.data().CharacterId === id) {
          updateDoc(documentRef, {
            CharacterId: id,
            likedbyUsers: [...likedArr],
          });
        }
      });
    });
    setReload(true);
  };

  const createDocument = () => {
    addDoc(colRef, {
      CharacterId: id,
      likedbyUsers: [currentUser.uid],
    }).then((e) => {});
    setReload(false);
  };

  const updateDocument = (document, likedbyUsers) => {
    const documentRef = doc(db, "users", document.id);
    if (document.data().CharacterId === id) {
      likedbyUsers.push(document.data().likedByUsers);
      if (!document.data().likedbyUsers.length) {
        updateDoc(documentRef, {
          CharacterId: id,
          likedbyUsers: [currentUser.uid],
        });
      } else {
        updateDoc(documentRef, {
          CharacterId: id,
          likedbyUsers: [currentUser.uid, ...likedbyUsers],
        });
      }
    }
  };

  const handleLike = () => {
    getDocs(colRef).then((snapshot) => {
      if (!snapshot.docs.filter((e) => e.CharacterId === id).length > 0) {
        createDocument();
      } else {
        let likedbyUsers = [];
        snapshot.docs.forEach((document) => {
          updateDocument(document, likedbyUsers);
        });
        setUser([...likedbyUsers]);
      }
    });

    setReload(false);
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
                <button
                  onClick={() => (reload ? handleLike() : handleUnlike())}
                >
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
