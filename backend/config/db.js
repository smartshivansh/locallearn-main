const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_BD_URI)
  .then((e) => console.log(`Connected to mongoDb:${e.connection.host}`))
  .catch((e) => console.log(e));

module.exports = mongoose;
