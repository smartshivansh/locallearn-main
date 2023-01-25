const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  email: {
    type: String,
    default: "",
    required: true,
  },
  chat: {
    type: Array,
    default: [{
      type: "qr",
      content: { text: "Hi there! How are you?", reaponse: "no response", index: 0 },
      position: "left",
    },]
  },
});

module.exports = User = mongoose.model("ChatQA", ChatSchema);

// const Chat = mongoose.model();
// module.exports = Chat;
