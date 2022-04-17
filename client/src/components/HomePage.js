import React, { useContext, useEffect } from "react";
import { AuthContext } from "./Form/AuthContext";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    console.log({ currentUser });
  }, []);
  return (
    <>
      <div></div>
    </>
  );
};

export default HomePage;
