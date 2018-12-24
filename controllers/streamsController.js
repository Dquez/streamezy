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
  fetchStreams: function (req, res) {
    db.Stream
      .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  fetchStream: function (req, res) {
    db.Stream
      .findOne({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createStream: function (dbStream, res) {
    db.Stream
      .create(dbStream.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  editStream: function (req, res) {
    db.Stream
      .findOneAndUpdate({ _id: req.params.id}, req.body, {new:true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // remove: function (req, res) {
  //   db.Stream
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
}

// deleteStream
// editStream

router.post("/api/streams", cors(corsOptions), streamFunctions.createStream);

router.get("/api/streams", streamFunctions.fetchStreams);

router.get("/api/streams/:id", streamFunctions.fetchStream);

router.patch("/api/streams/:id", streamFunctions.editStream);

// router.patch("/api/favoriteArticle/:id", streamFunctions.update);

// router.patch("/api/articleTag/:id", streamFunctions.update);

// router.delete("/api/article/:id", streamFunctions.remove)

// //  If no API routes are hit, send the React app
// router.use(function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
// module.exports = function (app) {
//   // app.get('/', requireAuth, function (req, res) {
//   //      res.send({
//   //           hi: 'there'
//   //      });
//   // })
//   app.post('/api/streams', cors(corsOptions), streamFunctions.createStream);
//   // app.post('/signin', cors(corsOptions), requireSignin, Authentication.signin);
// }