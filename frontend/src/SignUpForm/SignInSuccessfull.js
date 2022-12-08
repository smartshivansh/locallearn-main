import React, { useEffect, sucess } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./SignInSuccessfull.module.css";

import QuestionSelectorWindow from "../QuestionSelector/QuestionSelectorWindow";
import { useState } from "react";

import image1 from "../images/success.svg";

const SignInSuccessfull = () => {
  const navigate = useNavigate();
  const [sucess, setSucess] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      navigate("/app/question");
    }, 4000);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <p className={classes.welcome}>welcome to locallearn</p>
      </div>
      <div className={classes.right}>
        <p className={classes.content}>Sign up successful!</p>
        <img className={classes.image} alt="imag" src={image1} />
        <p className={classes.content}>
          You will be redirected to set up your profile in next step.
        </p>
      </div>
      <p className={classes.doions}>Powered By Doions Pvt Ltd</p>
    </div>
  );
};

export default SignInSuccessfull;
