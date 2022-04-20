import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, firestore } from "./firebase";
import { AuthContext } from "./Form/AuthContext";
import styled from "styled-components";

const Profile = () => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const [photoURL, setPhotoURL] = useState();
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  const colRef = collection(db, "users");

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      setUserData(
        snapshot?.docs?.map((document) => {
          return document.data();
        })
      );
    });
  }, []);
  return (
    <>
      <Wrapper>
        <div>
          {error && <alert>{error}</alert>}
          <div>UserName: {currentUser?.displayName}</div>
          <div>Email: {currentUser?.email}</div>
          <div>UserId: {currentUser?.uid}</div>
        </div>{" "}
        <div>
          <button onClick={handleLogout}>Log Out</button>
          <img src={photoURL} />
        </div>
        {userData?.map((data) => {
          return (
            <div>
              {data?.likedBy?.id?.includes(currentUser?.uid) ? (
                <div>
                  <div>Id: {data?.CharacterId}</div>
                  <div>Name:{data?.likedBy?.CharacterName}</div>
                  <CharacterImage src={data?.likedBy?.CharacterImg} />
                  <div>
                    Comment By {currentUser?.displayName}:
                    {data?.comments?.comment}
                  </div>
                </div>
              ) : (
                <div>
                  Comment By {currentUser?.displayName}:
                  {data?.comments?.comment}
                </div>
              )}
            </div>
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  border: 2px solid blue;
`;
const CharacterImage = styled.img`
  height: 250px;
`;
export default Profile;
