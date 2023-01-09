import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./SignupDetail.module.css";
import logo from "../images/logoblack.svg";

const NewPasswordSucessScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/app/login");
    }, 2100);
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.left}>
        <img src={logo} alt="locallearnlogo" className={classes.img} />
      </div>
      <div className={classes.right}>
        <div className={classes.form}>
          <p className={classes.login}>Password changed Successfully</p>
          <p className={classes.login}>Please Login to continue.</p>
        </div>
        {/* <p className={classes.doions}>Powered by Doions Pvt Ltd</p> */}
      </div>
    </div>
  );
};

export default NewPasswordSucessScreen;
