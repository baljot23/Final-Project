import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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
import styled from "styled-components";

const CommentPost = () => {
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [reload, setReload] = useState(true);
  const [docRef, setDocRef] = useState(null);

  const colRef = collection(db, "users");
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      let commentsByUser = [];

      snapshot.docs.forEach((document) => {
        if (document.data().CharacterId === id) {
          setDocRef(doc(db, "users", document.id));
          document.data().likedBy &&
            commentsByUser.push(document.data().likedBy.id);
          document.data().comments &&
            commentsByUser.push(document.data().comments.id);
        }
      });

      setUser([...commentsByUser]);
    });
  }, [reload]);

  const handlePost = () => {
    setReload(!reload);
    console.log(user);
    if (user?.includes(currentUser.uid)) {
      getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((document) => {
          const documentRef = doc(db, "users", document.id);

          if (
            document.data().CharacterId === id &&
            (document.data().likedBy || document.data().comments)
          ) {
            updateDoc(documentRef, {
              comments: { id: currentUser.uid, comment: comment },
            });
          } else if (
            document.data().CharacterId === id &&
            !document.data().comments
          ) {
            updateDoc(documentRef, {
              comments: { id: currentUser.uid, comment: comment },
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
        comments: { id: currentUser.uid, comment: comment },
      }).then((e) => {
        console.log("liked");
      });
    }
  };

  return (
    <>
      <DetailBox>
        <form>
          <CommentInput value={comment} onChange={handleChange} />
          <CommentButtons>
            <Post
              onClick={() => {
                handlePost();
              }}
              type="button"
              disabled={!comment}
            >
              Post
            </Post>
            <Cancel onClick={() => {}}>Cancel</Cancel>
          </CommentButtons>
        </form>
      </DetailBox>
    </>
  );
};

const DetailBox = styled.div`
  width: 320px;
  border: 1px solid lightblue;
  margin: 50px;
`;
const CommentInput = styled.input`
  border: none;
  padding: 10px 20px;
  height: 40px;
  line-height: 40px;
  background: white;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 10px 0px;
  width: 100%;
`;

const CommentButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1px;
`;
const Post = styled.button`
  width: 50%;
  height: 30px;
  border: none;
  cursor: pointer;
  background-color: black;
  color: white;
`;
const Cancel = styled.button`
  width: 50%;
  height: 30px;
  border: none;
  margin-left: 5px;
  cursor: pointer;
  background-color: black;
  color: white;
`;
export default CommentPost;
