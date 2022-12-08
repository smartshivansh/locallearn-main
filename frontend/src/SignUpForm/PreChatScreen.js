import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./PreChatScreen.module.css";

const PreChatScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/app/chat");
    }, 2100);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <p className={classes.welcome}>welcome to locallearn</p>
      </div>
      <div className={classes.right}>
        <p className={classes.content}> Your profile is complete now</p>
        <p className={classes.content}>You may start chatting with the bot</p>
      </div>
      <p className={classes.doions}>Powered By Doions Pvt Ltd</p>
    </div>
  );
};

export default PreChatScreen;
