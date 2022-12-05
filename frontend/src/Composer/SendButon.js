import React from "react";

import classes from "./SendButton.module.css";

const SendButton = (props) => {
  return (
    <div className={classes.btn}>
      <div className={classes.vector} onClick={props.onClick}></div>
    </div>
  );
};

export default React.memo(SendButton);
