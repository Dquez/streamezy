// const path = require("path");
const router = require("express").Router();
const db = require("../models");

// Cors setup
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
router.use(cors());

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

router.post("/api/streams", cors(corsOptions), streamFunctions.createStream);

router.get("/api/streams", streamFunctions.fetchStreams);

router.get("/api/streams/:id", streamFunctions.fetchStream);

router.delete("/api/streams/:id", streamFunctions.deleteStream)

router.patch("/api/streams/:id", streamFunctions.editStream);

// //  If no API routes are hit, send the React app
// router.use(function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;