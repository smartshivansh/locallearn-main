const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QA = new Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  answer: {
    type: String,
    required: true,
    unique: true,
  },
  reaction: {
    type: Boolean,
  },
});

module.exports = User = mongoose.model("QA", QA);
