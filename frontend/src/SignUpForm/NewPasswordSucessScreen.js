import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import classes from "./PreChatScreen.module.css";
import classes from "./SignupDetail.module.css";

const NewPasswordSucessScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/app/login");
    }, 2100);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <p className={classes.welcome}>welcome to locallearn</p>
      </div>
      <div className={classes.right}>
        <p className={classes.content}> password change sucessfully</p>
        <br />
        <p className={classes.content}>Please login to continue</p>
      </div>
      {/* <p className={classes.doions}>Powered By Doions Pvt Ltd</p> */}
    </div>
  );
};

export default NewPasswordSucessScreen;
