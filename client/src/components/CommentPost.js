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
import { AuthContext, currentUser } from "./Form/AuthContext";

const CommentPost = () => {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(false);
  const [reload, setReload] = useState(false);
  const [docRef, setDocRef] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const colRef = collection(db, "users");
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handlePost = () => {
    getDocs(colRef).then((snapshot) => {
      console.log(snapshot.docs);
      if (!snapshot.docs.length) {
        addDoc(colRef, {
          CharacterId: id,
          comments: [{ id: currentUser.uid, comment: comment }],
        });
      }
      snapshot.docs.forEach((document) => {
        const currentDoc = doc(db, "users", document.id);
        let comments;
        if (document.data().comments) {
          comments = [...document.data().comments];
        } else {
          comments = [];
        }
        if (document.data().CharacterId === id) {
          updateDoc(currentDoc, {
            comments: [{ id: currentUser.uid, comment: comment }, ...comments],
          });
        } else {
          addDoc(colRef, {
            comments: [{ id: currentUser.uid, comment: comment }],
          });
        }
      });
    });
  };

  return (
    <form>
      <input value={comment} onChange={handleChange} />
      <div>
        <button
          onClick={() => {
            handlePost();
          }}
          type="button"
          disabled={!comment}
        >
          Post
        </button>
        <button onClick={() => {}}>Cancel</button>
      </div>
    </form>
  );
};

export default CommentPost;
