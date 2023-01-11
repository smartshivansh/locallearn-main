import classes from "./SendBubble.module.css";
import { useSelector } from "react-redux";

import React, { useEffect } from "react";
import apis from "../Constants/api";

const SendBubble = (props) => {
  const email = useSelector((state) => state.userdata.email);

  return (
    <div>
      {props.children}
      <div className={classes.bubble}>{props.content}</div>
    </div>
  );
};

export default React.memo(SendBubble);
