const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  email: {
    type: String,
    default: "",
    required: true,
  },
  chat: {
    type: Array,
    default: {},
  },
  responses: {
    type: Array,
    default: [],
  },
});

module.exports = User = mongoose.model("ChatQA", ChatSchema);

// const Chat = mongoose.model();
// module.exports = Chat;
