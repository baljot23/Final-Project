import { addDoc, collection, getDocs, QuerySnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  const signup = async (email, password) => {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const colRef = collection(db, "users");
    getDocs(colRef).then((snapshot) => {
      console.log(snapshot.docs);
    });
    if (user) {
      addDoc(colRef, {
        title: "first article",
        author: user.uid,
        fisrt: "2",
      }).then((e) => {});
    }
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const restPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const getUsersFromFirebase = [];
  //   const subscriber = db.collection("users").onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       getUsersFromFirebase.push({
  //         ...doc.data(),
  //         key: doc.id,
  //       });
  //       setUser(getUsersFromFirebase);
  //       setLoading(false);
  //     });
  //   });
  //   return subscriber();
  // }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, login, logout, restPassword }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
