import React from "react";

import Spinner from "react-bootstrap/Spinner";
import classes from "./Spinner.module.css";

const Spinners = () => {
  return (
    <div className={classes.container}>
      <div className={classes.spinner}>
        <Spinner animation="border" />
      </div>
    </div>
  );
};

export default Spinners;
