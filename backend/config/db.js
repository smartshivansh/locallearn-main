const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then((e) => console.log(`Connected to mongodb:${e.connection.host}`))
  .catch((e) => console.log(e));

module.exports = mongoose;
