// const path = require("path");
const router = require("express").Router();
const db = require("../models");

// Cors setup
const cors = require('cors');
const whitelist = [ 'http://localhost:8080/', 'https://streamezy.herokuapp.com']
const corsOptionsDelegate = function ({headers}, callback) {
    const origin = headers.referer;
    // if the origin is coming from postman, disable cors
    if(headers.hasOwnProperty(['postman-token'])) return callback(null, true);
    // if the origin is coming from our client application, disable cors, otherwise block the request
    whitelist.indexOf(origin) > -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'));
}

const streamFunctions = {
  fetchStreams (req, res) {
    db.Stream
      .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  fetchStream (req, res) {
    db.Stream
      .findOne({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createStream (dbStream, res) {
    db.Stream
      .create(dbStream.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  editStream (req, res) {
    db.Stream
      .findOneAndUpdate({ _id: req.params.id}, req.body, {new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteStream (req, res) {
    db.Stream
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}

router.post("/api/streams", cors(corsOptionsDelegate), streamFunctions.createStream);

router.get("/api/streams", cors(corsOptionsDelegate), streamFunctions.fetchStreams);

router.get("/api/streams/:id", cors(corsOptionsDelegate), streamFunctions.fetchStream);

router.delete("/api/streams/:id", cors(corsOptionsDelegate), streamFunctions.deleteStream)

router.patch("/api/streams/:id", cors(corsOptionsDelegate), streamFunctions.editStream);

// //  If no API routes are hit, send the React app
// router.use(function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;