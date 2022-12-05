import React from "react";

import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <div className={classes.load}></div>
      </div>
    </div>
  );
};

export default Loader;
