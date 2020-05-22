const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
var bodyParser = require("body-parser");

router.use(bodyParser.json());

function validateSong(song) {
  const schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().min(3).required(),
    artist: Joi.string().min(3).required()
  });
  return schema.validate(song);
}

const songs = [
  { id: "1", title: "Home", artist: "Kit Chan" },
  { id: "2", title: "A song of ice and fire", artist: "Unknown" },
  { id: "3", title: "Maple", artist: "Jay Chou" }
];

// router.get("/", function (req, res) {
//   res.status(200);
//   res.send("Welcome to my homepage");
// });

const fs = require("fs");

router.get("/", function (req, res, next) {
  fs.readFile("/file-does-not-exist", function (err, data) {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

router.get("/", (req, res, next) => {
  console.log("You should not see this line in the console 😡");
});

router.get("/songs", function (req, res) {
  res.status(200);
  res.send(songs);
});

router.get("/songs/:id", function (req, res) {
  const songId = req.params.id;
  const requestedSong = songs.find((song) => song.id === songId);
  res.status(200);
  res.send(requestedSong);
});

router.post("/songs", function (req, res) {
  console.log(req.body);
  const songTitle = req.body.title;
  const songArtist = req.body.artist;
  songs.push({ id: songs.length + 1, title: songTitle, artist: songArtist });

  res.status(200);
  res.send(songs);
});

router.put("/songs/:id", function (req, res) {
  // 1. get song to be updated
  console.log(req.params.id);
  let songsWithMatchingId = songs.filter((song) => song.id === req.params.id);
  let songToBeUpdated = songsWithMatchingId[0];

  // 2. update song
  songToBeUpdated["title"] = req.body.title;

  // 3. send response with updated song
  res.status(200);
  res.send(songToBeUpdated);
});

router.delete("/songs/:id", function (req, res) {
  // 1. filter out the song which match the id
  let remainingSongs = songs.filter((song) => song.id !== req.params.id);

  // 2. send response with remaining songs
  res.status(200);
  res.send(remainingSongs);
});

router.use((err, req, res, next) => {
  if (err.message === "Unexpected network error") {
    console.log("I don't know how to handle network error. Pass it on.");
    next(err);
  } else {
    console.log("Unknown error. Pass it on.");
    next(err);
  }
});

module.exports = router;
