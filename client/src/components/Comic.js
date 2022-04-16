import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./Form/AuthContext";
import { FcLike } from "react-icons/fc";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

const Comic = () => {
  const [singleComic, setSingleComic] = useState();
  const [user, setUser] = useState(false);
  const [reload, setReload] = useState(false);
  const [docRef, setDocRef] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/comic/${id}`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setSingleComic(json?.data);
      });
  }, []);

  // console.log(singleComic);
  const colRef = collection(db, "users");

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      let likedbyUsers = [];

      snapshot.docs.forEach((document) => {
        console.log("hello");
        if (document.data().ComicId === id) {
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
        ComicId: id,
        likedBy: currentUser.uid,
      }).then((e) => {
        console.log("liked");
      });
    } else {
      deleteDoc(docRef).then((e) => {
        console.log("unliked");
      });
    }
  };

  return (
    <>
      <div>
        {singleComic?.map((comic) => {
          console.log(comic);
          return (
            <div key={comic.id}>
              <img
                src={comic?.images[0]?.path + "." + comic?.images[0]?.extension}
              />
              <div>Id: {comic?.id}</div>
              <div>Description: {comic?.description}</div>
              <div>Series: {comic?.series?.name}</div>
              <button onClick={() => handleLike()}>
                <FcLike />
                Like this comic
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comic;
