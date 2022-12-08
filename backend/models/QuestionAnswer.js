const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QA = require("./QA");

const QuestionAnswer = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  QA: {
    type: Array,
    default: [],
  },
});
