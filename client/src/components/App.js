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

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} exact></Route>
          <Route path="/profile/:_id" element={<Profile />} exact></Route>
          <Route path="/characters" element={<AllCharacters />} exact></Route>
          <Route path="/character/:id" element={<Character />} exact></Route>
          <Route
            path="/character/comic/:id"
            element={<CharacterComic />}
            exact
          ></Route>{" "}
          <Route path="/comics" element={<AllComics />} exact></Route>
          <Route path="/comics/:id" element={<Comic />} exact></Route>
          <Route path="/Series" element={<Series />}></Route>
          <Route path="" element={<Error />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
