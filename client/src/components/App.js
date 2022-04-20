import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Profile from "./Profile";
import Character from "./Character";
import AllCharacters from "./AllCharacters";
import AllComics from "./AllComics";
import CharacterComic from "./CharacterComic";
import Series from "./Series";
import Error from "./Error";
import Comic from "./Comic";
import Signup from "./Form/Signup";
import Login from "./Form/Login";
import ForgotPassword from "./Form/ForgotPassword";

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Signup />} exact></Route>
          <Route path="/login" element={<Login />} exact></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
            exact
          ></Route>
          <Route
            path="/home"
            element={
              <>
                <Header />
                <HomePage />
              </>
            }
            exact
          ></Route>
          <Route
            path="/profile"
            element={
              <>
                {" "}
                <Header />
                <Profile />
              </>
            }
            exact
          ></Route>
          <Route
            path="/characters"
            element={
              <>
                {" "}
                <Header />
                <AllCharacters />
              </>
            }
            exact
          ></Route>
          <Route
            path="/character/:id"
            element={
              <>
                {" "}
                <Header />
                <Character />
              </>
            }
            exact
          ></Route>
          <Route
            path="/character/comic/:id"
            element={
              <>
                {" "}
                <Header />
                <CharacterComic />
              </>
            }
            exact
          ></Route>{" "}
          <Route
            path="/comics"
            element={
              <>
                {" "}
                <Header />
                <AllComics />
              </>
            }
            exact
          ></Route>
          <Route
            path="/comics/:id"
            element={
              <>
                {" "}
                <Header />
                <Comic />
              </>
            }
            exact
          ></Route>
          <Route
            path="/Series"
            element={
              <>
                {" "}
                <Header />
                <Series />
              </>
            }
          ></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
