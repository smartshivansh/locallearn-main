const express = require("express");
require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { Server } = require("socket.io");
var cors = require("cors");
var validator = require("email-validator");

const Users = require("./models/users");
const { now } = require("mongoose");



let onlineUsers = [];

const port = process.env.PORT || 8090;

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const allowlist = [
  "http://doornextshop.com",
  "https://doornextshop.com",
  "http://www.doornextshop.com",
  "https://www.doornextshop.com",
  "http://locallearn.in",
  "http://www.locallearn.in",
  "https://locallearn.in",
  "https://www.locallearn.in",
  "http://localhost:3000"
];

app.use((req, res, next) => {
  if (allowlist.indexOf(req.headers.origin) !== -1) {
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

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));
app.use("/", require("./routes/users"));

//html pages

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "localLearnLive", "index.html"));
});
app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, "localLearnLive", "privacyPolicy.html"));
});
app.get("/toc", (req, res) => {
  res.sendFile(path.join(__dirname, "localLearnLive", "termsOfUse.html"));
});
app.get("/ethics", (req, res) => {
  res.sendFile(path.join(__dirname, "localLearnLive", "Ethics.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "localLearnLive", "aboutUs.index.html"));
});
app.get("/philosophy", (req, res) => {
  res.sendFile(path.join(__dirname, "localLearnLive", "ourPhilosophy.html"));
});
app.get("/community", (req, res) => {
  res.sendFile(path.join(__dirname, "localLearnLive", "community.html"));
});

//react pages

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

const server = app.listen(port, () => {
  console.log(`Port is running at http://localhost:${port}`);
});

var corsOptions = {
  Headers: {
    "Access-Control-Allow-Origin": "*",
  },
};
// trainChatBotIA();
const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log(socket.id, "connected ???");
  onlineUsers.push(socket.id);
  io.emit("broadcast", onlineUsers.length);

  // socket.on('onlineStatus', ({}, callback) => {
  console.log("user online status ---> ", onlineUsers);
  //   callback(onlineUsers);
  // });
  //
  socket.on("SendMessage", async (data) => {
    // console.log('process --->', process.env.OPENAI_API_KEY);
    console.log("data format", data);

    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: data.text,
      temperature: 0.6,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("RESPONSE", completion.data.choices[0].text.trim());
    // let response = await generateResponseAI(data.text);
    // console.log(response);

    socket.emit("send-msg-response", completion.data.choices[0].text.trim());

    data["response"] = completion.data.choices[0].text.trim();

    console.log("data with reponse", data);

    var json = JSON.stringify(data);

    fs.appendFile("myjsonfile.json", json + "\n", "utf8", function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });

  socket.on("disconnect", () => {
    const index = onlineUsers.indexOf(socket.id);
    onlineUsers.splice(index, 1);
    io.emit("broadcast", onlineUsers.length);
    console.log("socket disconnected --> ", onlineUsers); // undefined
  });
});

module.exports = io;
