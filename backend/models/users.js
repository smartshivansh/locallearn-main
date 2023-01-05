const mongoose = require("mongoose");
const conn = require("../config/db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 8 },
    createdAt: { type: Date, default: Date.now },
    token: { type: String, default: "cfref" },
    verified: { type: Boolean, default: false },
    location: { type: String, default: "location" },
    profession: { type: String, default: "profession" },
    goodSkills: { type: Array, default: [] },
    learnSkills: { type: Array, default: [] },
    otp: Number,
    otp_expiry: Date,
    resetPasswordOtp: Number,
    resetPasswordOtpExpiry: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  // const salt = bcrypt.genSaltSync(10);
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

userSchema.methods.getAuthToken = async function (data) {
  let param = {
    id: this._id,
    email: this.email,
    phone: this.phone,
  };
  var tokenValue = jwt.sign(param, "hssssghsjmQQQisjsnsnbnmmmaxmnmmamsm", {
    expiresIn: "300000s",
  });
  console.log(tokenValue);
  this.token = tokenValue;
  await this.save();
  return tokenValue;
};

userSchema.methods.comparePassword = function (candidatePassword) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (candidatePassword === this.password) {
      return true;
    } else {
      return false;
    }
    // if (err) {
    //   return false;
    // } else {
    //   return true;
    // }
  });
};

let users = conn.model("users", userSchema);

module.exports = users;
