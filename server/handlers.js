const { default: axios } = require("axios");
const { response } = require("express");

("use strict");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//All Characters:

const getAllCharacters = async (req, res) => {
  const offset = req.params.offset;

  axios
    .get(
      `https://gateway.marvel.com/v1/public/characters?ts=1&limit=100&offset=${offset}&apikey=b30f33d632e3caf9525ba38e0cb3ccd7&hash=ceef2233af09fcfd332f2bbb3714bcdc`
    )
    .then((response) => {
      //   console.log(response.data.data.results);
      res.status(200).json({ status: 200, data: response.data.data.results });
    });
};

//Character based on their id:

const getCharacter = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  axios
    .get(
      `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=b30f33d632e3caf9525ba38e0cb3ccd7&hash=ceef2233af09fcfd332f2bbb3714bcdc`
    )
    .then((response) => {
      // console.log(response.data.data.results);
      res
        .status(200)
        .json({ status: 200, data: response.data.data.results, id: id });
    });
};

//Comic based on characters id:

const getCharacterComic = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  axios
    .get(
      `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=1&apikey=b30f33d632e3caf9525ba38e0cb3ccd7&hash=ceef2233af09fcfd332f2bbb3714bcdc`
    )
    .then((response) => {
      // console.log(response.data.data.results);
      res
        .status(200)
        .json({ status: 200, data: response.data.data.results, id: id });
    });
};

//All comics:

const getAllComics = async (req, res) => {
  const offset = req.params.offset;
  // console.log(offset);

  axios
    .get(
      `https://gateway.marvel.com:443/v1/public/comics?ts=1&limit=100&offset=${offset}&apikey=b30f33d632e3caf9525ba38e0cb3ccd7&hash=ceef2233af09fcfd332f2bbb3714bcdc`
    )
    .then((response) => {
      // console.log(response.data.data.results);
      res.status(200).json({ status: 200, data: response.data.data.results });
    });
};

//Comic based on comic id:

const getComic = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  axios
    .get(
      `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=1&apikey=b30f33d632e3caf9525ba38e0cb3ccd7&hash=ceef2233af09fcfd332f2bbb3714bcdc`
    )
    .then((response) => {
      // console.log(response);
      res
        .status(200)
        .json({ status: 200, data: response.data.data.results, id: id });
    });
};

//All series:

const getSeries = async (req, res) => {
  const offset = req.params.offset;
  // console.log(offset);

  axios
    .get(
      `https://gateway.marvel.com/v1/public/series?ts=1&limit=100&offset=${offset}&apikey=b30f33d632e3caf9525ba38e0cb3ccd7&hash=ceef2233af09fcfd332f2bbb3714bcdc`
    )
    .then((response) => {
      // console.log(response.data.data.results);
      res.status(200).json({ status: 200, data: response.data.data.results });
    });
};

//ProfileInfo:

const getProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("Marvel");
  console.log("connected!");
  const id = req.params.id;
  console.log(id);

  const result = await db.collection("data").find().toArray();

  res.status(200).json({ status: 200, data: result });

  client.close();
};

//Add Infoformation to Profile:

const updateProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("Marvel");
  console.log("connected!");
  const query = { id: req.params.id };
  console.log(query);

  let newValues = { query, $set: { name: "jake" } };
  console.log(newValues);

  const result = await db
    .collection("data")
    .insertOne({ name: req.params.name });
  res
    .status(200)
    .json({ status: 200, data: result, message: "Information Updated" });

  client.close();
};
//Like a character

const addLike = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("Marvel");

  console.log("connected!");

  const id = req.params.id;

  const result = await db.collection("data").findOne({ id });

  if (result) {
    res.status(200).json({
      status: 200,
      data: result,
      _id,
      message: "Data Added",
    });
  } else {
    res.status(400).json({ status: 400 });
  }

  client.close();
};

//Unlike a character

const removeLike = async (req, res) => {
  // const { like } = req.body;
  // console.log(like);
  // res.status(200).json({ status: 200, data: like });
};

module.exports = {
  getAllCharacters,
  getCharacter,
  getAllComics,
  getComic,
  getCharacterComic,
  getSeries,
  addLike,
  removeLike,
  getProfile,
  updateProfile,
};
