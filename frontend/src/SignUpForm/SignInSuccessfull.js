import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./SignupDetail.module.css";

import { useState } from "react";

import image1 from "../images/success.svg";
import logo from "../images/logoblack.svg";

const SignInSuccessfull = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/app/question");
  //   }, 3000);
  //   setTimeout(() => {
  //     localStorage.clear();
  //   }, 1000 * 60 * 6024 * 5);
  // }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.left}>
        <img src={logo} alt="locallearnlogo" className={classes.img} />
      </div>
      <div className={classes.right}>
        <div className={classes.form}>
          <p className={classes.login}>Sign up successful!</p>
          <img className={classes.img} alt="imag" src={image1} />
          <p className={classes.login}>
            You will be redirected to set up your profile in next step.
          </p>
        </div>
        <p className={classes.doions}>Powered by Doions Pvt Ltd</p>
      </div>
    </div>
  );
};

export default SignInSuccessfull;
