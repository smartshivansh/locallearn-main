const Users = require("../models/users");
const Chat = require("../models/ChatQA");
var rn = require("random-number");
var validator = require("email-validator");

const axios = require("axios");

require("dotenv").config();

const { json } = require("express");

const bcrypt = require("bcrypt");

const { createTransport } = require("nodemailer");

const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");
const users = async (req, res) => {};

let password;

//add nodemailer  *****
const mailer_auth = {
  user: "apikey",
  pass: process.env.SEND_GRID_API_KEY,
};
const transport = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 25,
  secure: false,
  service: "SendGrid",
  requireTLS: false,
  auth: mailer_auth,
});

const usernamecheck = async (req, res) => {
  const username = req.body.username;

  let user = await Users.findOne({ username });

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
    const { name, email, username, password } = req.body;

    let type;

    let options = {
      min: 100000,
      max: 999999,
      integer: true,
    };

    const otp = rn(options);

    let isValidEmail = validator.validate(email);
    if (isValidEmail) {
      type = "email";
    } else {
      const no = isNaN(email);
      const mobile = email.toString();
      if (!no && mobile.length === 10) {
        type = "contact No";
      } else {
        res.json(
          JSON.stringify({
            sucess: false,
            invalid: true,
            message: "invalid input",
          })
        );
        return;
      }
    }

    let user = await Users.findOne({ email });

    if (user) {
      return res.json(
        JSON.stringify({ sucess: false, message: "User already exists" })
      );
    }

    if (type === "email") {
      const mailOptions = {
        from: "in@myty.in",
        to: email,
        subject: "OTP from LocalLearn",
        text: "Your OTP for LocalLerarn Registration is " + otp,
      };

      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(1111, err);
        } else {
          res
            .status(200)
            .json(JSON.stringify({ message: "can't send otp", sucess: false }));
          return;
        }
      });
    } else {
      fetch(
        `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST_SMS_API_KEY}&variables_values=${otp}&route=otp&numbers=${email}`
      );
    }

    let data = await Users.create({
      name,
      username,
      email,
      password,
      otp,
      otp_expiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    let myToken = await data.getAuthToken();

    // Users.findOneAndUpdate({ email }, { token: myToken });

    const chat = await Chat.create({
      email,
      questions: [],
      answers: [],
    });
    return res
      .status(200)
      .json(
        JSON.stringify({ message: "ok", token: myToken, sucess: true, otp })
      );
  } catch (error) {
    return res
      .status(500)
      .json(JSON.stringify({ sucess: false, message: error.message }));
  }
};

//questionresponses
const questions = async (req, res) => {
  const email = req.body.email;

  if (req.body.id === "q5") {
    Users.findOneAndUpdate(
      { email },
      { goodSkills: req.body.skills },
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
  } else if (req.body.id === "q4") {
    Users.findOneAndUpdate(
      { email },
      { learnSkills: req.body.skills },
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
  }
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

const signupPassword = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    // console.log({ email, username, password });

    password = bcrypt.hashSync(password, 10);

    if (email && username && password) {
      const updatedUser = await Users.findOneAndUpdate(
        { email },
        { username, password },
        { new: true }
      );
      // console.log("Updated User Document", updatedUser);
      res.status(200).json({ msg: "Updated Successfully", user: updatedUser });
    } else {
      res.status(400).json({ msg: "USERNAME_OR_PASSWORD_EMPTY" });
    }
  } catch (error) {
    console.log(error);
  }
};

const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(301).json({ sucess: false, message: "Invalid email/password" });
  }

  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (!isMatch) {
        res.status(200).json(
          JSON.stringify({
            sucess: false,
            message: "Wrong Password",
          })
        );
      } else {
        // don't send password to client
        user.password = undefined;

        res.status(200).json(
          JSON.stringify({
            sucess: true,
            message: "login sucessfull",
            user: user,
          })
        );
      }
    });
  } else {
    res.status(200).json(
      JSON.stringify({
        sucess: false,
        message: "Email ID not registered",
      })
    );
  }
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

const userdata = async (req, res) => {
  const { email, type, data } = req.body;

  if (type === "location") {
    Users.findOneAndUpdate({ email }, { location: data }, (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result);
      if (result == null) {
        res
          .status(200)
          .json(
            JSON.stringify({ success: false, message: "response not added" })
          );
      } else {
        res
          .status(200)
          .json(JSON.stringify({ success: true, message: "response added" }));
        //Next Step is to set password. But that all wiil go to Users Collection.
        //The signup collection is only for doing the OTP/Verification purpose.
      }
    });
  } else if (type === "profession") {
    Users.findOneAndUpdate({ email }, { profession: data }, (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(result);
      if (result == null) {
        res
          .status(200)
          .json(
            JSON.stringify({ success: false, message: "response not added" })
          );
      } else {
        res
          .status(200)
          .json(JSON.stringify({ success: true, message: "response added" }));
        //Next Step is to set password. But that all wiil go to Users Collection.
        //The signup collection is only for doing the OTP/Verification purpose.
      }
    });
  }
};

const resendOtp = async (req, res) => {
  let options = {
    min: 100000,
    max: 999999,
    integer: true,
  };

  let email = req.body.email;
  const otp = rn(options);

  Users.findOneAndUpdate(
    { email: email },
    { otp: otp, updated_at: Date.now() },
    (err, result) => {
      if (err) {
        return res.status(200).json(JSON.stringify({ msg: "no user found" }));
      }
      // console.log(result);
    }
  );

  if (validator.validate(email)) {
    const mailOptions = {
      from: "in@myty.in",
      to: email,
      subject: "OTP from LocalLearn",
      text: "Your OTP for LocalLerarn Registration is " + otp,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(1111, err);
        return res
          .status(200)
          .json(
            JSON.stringify({ sucess: false, message: "failed to send email" })
          );
      } else {
        return res
          .status(200)
          .json(
            JSON.stringify({ message: "otp send sucessfully", sucess: true })
          );
      }
    });
  } else {
    fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST_SMS_API_KEY}&variables_values=${otp}&route=otp&numbers=${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.return) {
          return res
            .status(200)
            .json(
              JSON.stringify({ message: "otp send sucessfully", sucess: true })
            );
        } else {
          return res
            .status(200)
            .json(
              JSON.stringify({ sucess: false, message: "failed to send email" })
            );
        }
      });
  }
};

const finduser = async (req, res) => {
  const token = req.body.token;
  const user = Users.findOne({ token }, function (err, ress) {
    if (err) {
      console.log(err);
      return res.status(200).json(JSON.stringify({ sucess: false }));
    } else {
      if (ress === null) {
        return res.status(200).json(JSON.stringify({ sucess: false }));
      }
      const {
        name,
        email,
        username,
        location,
        profession,
        learnSkills,
        goodSkills,
      } = ress;

      return res.json(
        JSON.stringify({
          name,
          email,
          username,
          location,
          profession,
          learnSkills,
          goodSkills,
        })
      );
    }
  });
};

const questionAnswer = async (req, res) => {
  const { email, data, type } = req.body;

  if (!email || !data || !type) {
    return res.status(200).json(JSON.stringify({ sucess: false }));
  }
  const user = Chat.findOne({ email }, function (err, user) {
    if (err) {
      res.status(200).json(JSON.stringify({ sucess: false }));
    } else {
      if (type === "question") {
        const ques = user.questions;
        Chat.findOneAndUpdate(
          { email },
          { questions: [...ques, data] },
          function (err, result) {
            if (err) {
              res.status(200).json(JSON.stringify({ sucess: false }));
            } else {
              res.status(200).json(JSON.stringify({ sucess: true }));
            }
          }
        );
      } else if (type === "answer") {
        const ans = user.answers;
        const resp = user.responses;
        Chat.findOneAndUpdate(
          { email },
          {
            answers: [...ans, data.trim()],
            responses: [...resp, "no response"],
          },
          function (err, result) {
            if (err) {
              res.status(200).json(JSON.stringify({ sucess: false }));
            } else {
              res.status(200).json(JSON.stringify({ sucess: true }));
            }
          }
        );
      }
    }
  });
};

const responseUpdate = (req, res) => {
  const { email, response, answer } = req.body;
  console.log("def");

  if (!email || !response || !answer) {
    res.status(200).json(JSON.stringify({ sucess: false }));

    return;
  }

  Chat.findOne({ email }, function (err, user) {
    if (err) {
      res.status(200).json(JSON.stringify({ sucess: false }));
      return;
    } else {
      const index = user.answers.indexOf(answer.trim());
      if (index === -1) {
        console.log(answer);
        res.status(200).json(JSON.stringify({ sucess: false }));
        return;
      }
      let responses = user.responses;
      responses[index] = response;
      Chat.findOneAndUpdate(
        { email },
        { responses: responses },
        function (err, result) {
          if (err) {
            res.status(200).json(JSON.stringify({ sucess: false }));
            return;
          } else {
            res.status(200).json(JSON.stringify({ sucess: true }));
            return;
          }
        }
      );
    }
  });
};

const forgetPassword = (req, res) => {
  const { email } = req.body;

  let options = {
    min: 100000,
    max: 999999,
    integer: true,
  };
  const otp = rn(options);

  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(200)
          .json(JSON.stringify({ sucess: false, msg: "USER DOES NOT EXIST" }));
      } else {
        Users.findOneAndUpdate(
          { email: email },
          { otp: otp },
          (err, res) => {}
        );
        return res
          .status(200)
          .json(JSON.stringify({ sucess: true, msg: "otp send" }));
      }
    })
    .catch((err) => {
      res.send(
        JSON.stringify({
          msg: "EMAIL_DOES_NOT_EXISTS",
          sucess: false,
        })
      );
    });

  if (validator.validate(email)) {
    const mailOptions = {
      from: "in@myty.in",
      to: email,
      subject: "OTP from LocalLearn",
      text: "Your OTP for LocalLerarn Registration is " + otp,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json(
            JSON.stringify({ sucess: false, message: "failed to send email" })
          );
      } else {
        return res
          .status(200)
          .json(
            JSON.stringify({ message: "otp send sucessfully", sucess: true })
          );
      }
    });
  } else {
    fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST_SMS_API_KEY}&variables_values=${otp}&route=otp&numbers=${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.return) {
          return res
            .status(200)
            .json(
              JSON.stringify({ message: "otp send sucessfully", sucess: true })
            );
        } else {
          return res
            .status(200)
            .json(
              JSON.stringify({ sucess: false, message: "failed to send email" })
            );
        }
      });
  }
};

const newPassword = (req, res) => {
  const { email, password } = req.body;

  const spassword = bcrypt.hashSync(password, 10);

  Users.findOneAndUpdate({ email }, { password: spassword }, (err, ress) => {
    if (err) {
      console.log(err);
    }
  });

  res.status(200).json(JSON.stringify({ sucess: true, mgs: "ok" }));
};

module.exports = {
  users,
  signup,
  signin,
  otpverify,
  signupPassword,
  logout,
  usernamecheck,
  questions,
  userdata,
  resendOtp,
  finduser,
  questionAnswer,
  responseUpdate,
  forgetPassword,
  newPassword,
};
