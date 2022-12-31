const express = require("express");
require("./config/db");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8090;

const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  const allowList = [
    "http://localhost:4000",
    "http://localhost:3000",
    "http://doornextshop.com",
    "https://doornextshop.com",
    "https://doornextshop.com",
    "http://192.168.29.58:4000",
    "http://192.168.29.255:4000",
    undefined,
  ];

  console.log(req.headers.origin);

  if (allowList.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }

  next();
});

app.use(express.static(__dirname + "/localLearnLive"));
app.use(express.static(path.join(__dirname + "/build")));

// app.use("/app/*", (req, res, next) => {
//   console.log(req.session);
// });

app.get("/app/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/app/login", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/app/otplogin", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/app/question", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/app/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/app/forget", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/app/forgetotp", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/app/newpass", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/", require("./routes/users"));

app.listen(port, () => {
  console.log(`Port is running at http://localhost:${port}`);
});
