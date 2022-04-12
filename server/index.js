"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const {
  getAllCharacters,
  getCharacter,
  getCharacterComic,
  getAllComics,
  getComic,
  getSeries,
  addLike,
  removeLike,
  getProfile,
  updateProfile,
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())
  .use(cors())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------

  .get("/characters/:offset", getAllCharacters)
  .get("/character/:id", getCharacter)
  .get("/comics/:offset", getAllComics)
  .get("/comic/:id", getComic)
  .get("/character/comic/:id", getCharacterComic)
  .get("/series/:offset", getSeries)
  .get("/profile", getProfile)
  .post("/profile/:id", updateProfile)
  .post("/character/like/:id", addLike)
  .delete("/character/unlike/:id", removeLike)

  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
