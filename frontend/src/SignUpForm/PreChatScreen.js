import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./SignupDetail.module.css";
import logo from "../images/logoblack.svg";

const PreChatScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/app/chat");
    }, 2100);
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.left}>
        <img src={logo} alt="locallearnlogo" className={classes.img} />
      </div>
      <div className={classes.right}>
        <div className={classes.form}>
          <p className={classes.login}> Your profile is complete now</p>
          <p className={classes.login}>You may start chatting with the bot</p>
        </div>
        <p className={classes.doions}>Powered By Doions Pvt Ltd</p>
      </div>
    </div>
  );
};

export default PreChatScreen;
