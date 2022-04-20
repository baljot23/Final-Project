import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { AuthContext } from "./Form/AuthContext";
import styled from "styled-components";

const CommentPost = ({ singleCharacter }) => {
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [reload, setReload] = useState(true);
  const [docRef, setDocRef] = useState(null);
  const [userData, setUserData] = useState();

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
            document.data().comments.forEach((eachComment) => {
              console.log(eachComment.id);
              commentsByUser.push(eachComment.id);
            });
        }
      });

      setUser([...commentsByUser]);
    });
  }, [reload]);

  const handlePost = () => {
    setReload(!reload);
    if (user?.includes(currentUser.uid)) {
      getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((document) => {
          const documentRef = doc(db, "users", document.id);
          if (document.data().UserId !== currentUser.uid) {
            return;
          }

          if (
            document.data().CharacterId === id &&
            (document.data().likedBy || document.data().comments)
          ) {
            let newComment = null;
            if (document.data().comments) {
              newComment = document.data().comments;
              newComment.push({
                id: currentUser.uid,
                comment: comment,
                CharacterId: document.data().CharacterId,
              });
            } else {
              newComment = [
                {
                  id: currentUser.uid,
                  comment: comment,
                  CharacterId: document.data().CharacterId,
                },
              ];
            }
            updateDoc(documentRef, {
              comments: newComment,
            });
          } else if (
            document.data().CharacterId === id &&
            !document.data().comments
          ) {
            updateDoc(documentRef, {
              comments: [
                {
                  id: currentUser.uid,
                  comment: comment,
                  CharacterId: document.data().CharacterId,
                },
              ],
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
        comments: [
          {
            id: currentUser.uid,
            comment: comment,
            CharacterId: document.data().CharacterId,
          },
        ],
      }).then((e) => {
        console.log("liked");
      });
    }
  };

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      setUserData(
        snapshot?.docs?.map((document) => {
          return document.data();
        })
      );
    });
  }, []);

  const CharacterId = singleCharacter?.map((Character) => {
    return Character?.id;
  });
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
      <div>
        {userData?.map((data) => {
          return (
            <>
              {data?.comments?.map((eachComment) => {
                return (
                  <div>
                    {eachComment?.CharacterId?.includes(CharacterId) ? (
                      <CommentContainer>
                        <Comments>
                          <CommentUserName>
                            Comment By {data?.likedBy?.UserName}:
                          </CommentUserName>
                          {eachComment?.comment}
                        </Comments>
                      </CommentContainer>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
};

const CommentContainer = styled.div``;
const CommentUserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;
const Comments = styled.div`
  width: 320px;
  border: 1px solid lightblue;
  margin: 50px;
  flex-direction: row;
  background-color: lightblue;
  padding: 5px;
`;
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
