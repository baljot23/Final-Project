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
      <UserInfo>
        {error && <alert>{error}</alert>}
        <UserName>
          <Word>UserName:</Word> {currentUser?.displayName}
        </UserName>
        <div>
          <Word>Email: </Word>
          {currentUser?.email}
        </div>
        <div>
          <Word>UserId:</Word> {currentUser?.uid}
        </div>

        <div>
          <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
          <img src={photoURL} />
        </div>
      </UserInfo>{" "}
      <Wrapper>
        {userData?.map((data) => {
          return (
            <>
              {data?.comments?.map((eachComment, index) => {
                console.log(data);
                return (
                  <div>
                    {data?.likedBy?.id?.includes(currentUser?.uid) ? (
                      <div>
                        <div>
                          <div>Id: {data?.CharacterId}</div>
                          <div>Name:{data?.likedBy?.CharacterName}</div>

                          <CharacterImage src={data?.likedBy?.CharacterImg} />
                        </div>

                        {eachComment?.id === currentUser?.uid ? (
                          <div>
                            <Comments>
                              <CommentUserName>
                                Comment By {data?.likedBy?.UserName}:
                              </CommentUserName>
                              {eachComment?.comment}
                            </Comments>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })}
            </>
          );
        })}
      </Wrapper>
    </>
  );
};

const CommentUserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const Comments = styled.div`
  width: 200px;
  padding: 10px;
  border: 1px solid lightblue;
  margin: 10px;
  flex-direction: row;
`;

const LogoutButton = styled.button`
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 20px;
  background-color: black;
  width: 5vw;
  height: 5vh;
  margin-left: 10px;
`;

const Word = styled.div`
  font-weight: bold;
  display: inline-flex;
  margin-right: 8px;
  margin: 10px;
`;

const UserName = styled.div``;

const UserInfo = styled.div`
  border: 2px solid #c7ceea;
  background-color: #c7ceea;
  display: flex;
  padding: 20px;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: grid;
  grid-gap: 50px;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
`;
const CharacterImage = styled.img`
  height: 250px;
`;
export default Profile;
