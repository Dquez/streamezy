const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const streamSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: {type: Number, required: true },
});

const Stream = mongoose.model("Stream", streamSchema);

module.exports = Stream;
