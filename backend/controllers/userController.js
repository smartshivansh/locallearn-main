const Users = require("../models/users");
// const otp = require("../models/otp")
const Signup = require("../models/Signup");
const Skills = require("../models/Skills");

const { json } = require("express");
const messagebird = require("messagebird")("6PBBEVn5eNSq66LuzuaoRXRrC");
var validator = require("email-validator");
var rn = require("random-number");
const bcrypt = require("bcrypt");

const { createTransport } = require("nodemailer");

const nodemailer = require("nodemailer");
let otp = 0;
var jwt = require("jsonwebtoken");
const users = async (req, res) => {};

let responses = [];

// nodemiller mail system

const sendMail = async (email, subject, text) => {
  const transport = createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f8f25657c316ca",
      pass: "362d1a8cdf173f",
    },
  });

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject,
    text,
  });
};

const usernamecheck = async (req, res) => {
  const username = req.body.username;

  let user = await Users.findOne({ username });
  console.log("lll");

  if (user) {
    res.json(
      JSON.stringify({ sucess: false, message: "username already taken" })
    );
  } else {
    res.json(JSON.stringify({ sucess: true, message: "username available" }));
  }
  return;
};

const signup = async (req, res) => {
  try {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    let user = await Users.findOne({ email });

    if (user) {
      res.json(
        JSON.stringify({ sucess: false, message: "User already exists" })
      );
      return;
    }

    const otp = Math.floor(Math.random() * 1000000);
    console.log(otp);

    let data = await Users.create({
      name,
      username,
      email,
      password,
      otp,
      otp_expiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    let skills = await Skills.create({
      email,
      Responses: [],
    });

    let response = await data.save();
    let skill = await skills.save();
    let myToken = await data.getAuthToken();

    // res.status(200);
    res
      .status(200)
      .json(
        JSON.stringify({ message: "ok", token: myToken, sucess: true, otp })
      );
  } catch (error) {
    res
      .status(500)
      .json(JSON.stringify({ sucess: false, message: error.message }));
  }
};

//questionresponses

const questions = async (req, res) => {
  const email = req.body.email;
  responses = [...responses, req.body.response];

  Skills.findOneAndUpdate(
    { email },
    { Responses: responses },
    (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result);
      if (result == null) {
        res.status(200).json(JSON.stringify({ msg: "response not added" }));
      } else {
        res.status(200).json(JSON.stringify({ msg: "response added" }));
        //Next Step is to set password. But that all wiil go to Users Collection.
        //The signup collection is only for doing the OTP/Verification purpose.
      }
    }
  );
};

//otpverify
const otpverify = async (req, res) => {
  if (!req.body.email) {
    res.json({ msg: "EMAIL_EMPTY" });
    return;
  }
  Users.findOneAndUpdate(
    { email: req.body.email, otp: req.body.otp },
    { verified: true, updated_at: Date.now() },
    (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result);
      if (result == null) {
        res.status(200).json(JSON.stringify({ msg: "OTP_UNMATCHED" }));
      } else {
        res.status(200).json(JSON.stringify({ msg: "OTP_MATCHED" }));
        //Next Step is to set password. But that all wiil go to Users Collection.
        //The signup collection is only for doing the OTP/Verification purpose.
      }
    }
  );
};

const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(301).json({ sucess: false, message: "Invalid email/password" });
  }
  let user = await Users.findOne({ email: req.body.email });
  const responseType = {
    message: "ok",
    sucess: false,
  };

  if (user) {
    // var match = await bcrypt.compare(req.body.password, user.password)
    var match = bcrypt.hashSync(req.body.password, 10);
    console.log(match);
    if (match) {
      let myToken = await user.getAuthToken();
      responseType.message = "login sucessfully";
      responseType.sucess = true;
      responseType.token = myToken;
    } else {
      responseType.message = "Wrong Password";
      responseType.sucess = false;
    }
  } else {
    responseType.message = "Email ID not registered";
    responseType.sucess = false;
  }
  res.status(200).json(JSON.stringify({ responseType }));
};

//forget password,

// const emailSend = async (req,res) => {
//     let data = await Users.findOne({email:req.body.email})
//     const responseType = {};
//     if(data){
//         let otpcode = Math.floor((Math.random()*10000)+1);
//         let otpData = new otp({
//             email:req.body.email,
//             code:otpcode,
//             expireIn: new Date().getTime()+ 300*1000
//         })
//         let otpResponese = await otpData.save();
//         responseType.statusText = 'Success'
//         responseType.message = 'chack email id'

//     }else{
//         responseType.statusText = 'error'
//         responseType.message = 'Email id not vaild'
//     }

//     res.status(200),json("ok")
// }

const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  users,
  signup,
  signin,
  otpverify,
  logout,
  usernamecheck,
  questions,
};
