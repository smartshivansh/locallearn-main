const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://shivansh:react@cluster0.7oywfvv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((e) => console.log(`Connected to mongoDb:${e.connection.host}`))
  .catch((e) => console.log(e));

module.exports = mongoose;
