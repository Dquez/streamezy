'use strict'
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require('cors');
const router = require('./controllers/streamsController');
// Configure body parser for AJAX requests
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
const streamsController = require("./controllers/streamsController");
// Serve up static assets
// app.use(express.static("client/build"));
// Add routes, both API and view
app.use(streamsController);

// Cors setup
exports.corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors());

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/streamezy",
  {
    useMongoClient: true
  }
);
router(app);
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

