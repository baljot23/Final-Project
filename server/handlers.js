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

//Get Most Recent Characters

const getRecentCharacters = async (req, res) => {
  axios
    .get(
      `https://gateway.marvel.com/v1/public/characters?ts=1&modifiedSince=2021-12-21T10:35:15-040&apikey=b30f33d632e3caf9525ba38e0cb3ccd7&hash=ceef2233af09fcfd332f2bbb3714bcdc`
    )
    .then((response) => {
      console.log(response.data.data.results);
      res.status(200).json({ status: 200, data: response.data.data.results });
    });
};

module.exports = {
  getAllCharacters,
  getCharacter,
  getAllComics,
  getComic,
  getCharacterComic,
  getSeries,
  getRecentCharacters,
};
