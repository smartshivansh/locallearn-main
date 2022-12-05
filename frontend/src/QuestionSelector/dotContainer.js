import React, { useState, useEffect } from "react";
import classes from "./dotContainer.module.css";

const DotContainer = (props) => {
  useEffect(() => {
    if (props.index === 1) {
      const dd1 = document.getElementById("d1");

      dd1.style.width = "1.3rem";
      dd1.style.height = "1.3rem";
      dd1.style.transition = "0.5s";
      dd1.style.background = "white";
    } else if (props.index === 2) {
      const dd1 = document.getElementById("d1");
      const dd2 = document.getElementById("d2");

      dd2.style.width = "1.3rem";
      dd2.style.height = "1.3rem";
      dd2.style.transition = "0.5s";
      dd2.style.background = "white";

      dd1.style.width = "1rem";
      dd1.style.height = "1rem";
      dd1.style.transition = "0.5s";
      dd1.style.background =
        "linear-gradient(208.07deg, #40e0d0 10.33%, #a9dbb8 73.15%)";
    }

    //3
    else if (props.index === 3) {
      const dd3 = document.getElementById("d3");
      const dd2 = document.getElementById("d2");

      dd3.style.width = "1.3rem";
      dd3.style.height = "1.3rem";
      dd3.style.transition = "0.5s";
      dd3.style.background = "white";

      dd2.style.width = "1rem";
      dd2.style.height = "1rem";
      dd2.style.transition = "0.5s";
      dd2.style.background =
        "linear-gradient(208.07deg, #40e0d0 10.33%, #a9dbb8 73.15%)";
    }

    //4
    else if (props.index === 4) {
      const dd4 = document.getElementById("d4");
      const dd3 = document.getElementById("d3");

      dd4.style.width = "1.3rem";
      dd4.style.height = "1.3rem";
      dd4.style.transition = "0.5s";
      dd4.style.background = "white";

      dd3.style.width = "1rem";
      dd3.style.height = "1rem";
      dd3.style.transition = "0.5s";
      dd3.style.background =
        "linear-gradient(208.07deg, #40e0d0 10.33%, #a9dbb8 73.15%)";
    }
    //5
    // else if (props.index === 5) {
    //   const dd5 = document.getElementById("d5");
    //   const dd4 = document.getElementById("d4");

    //   dd5.style.width = "1.3rem";
    //   dd5.style.height = "1.3rem";
    //   dd5.style.transition = "0.5s";
    //   dd5.style.background = "white";

    //   dd4.style.width = "1rem";
    //   dd4.style.height = "1rem";
    //   dd4.style.transition = "0.5s";
    //   dd4.style.background =
    //     "linear-gradient(208.07deg, #40e0d0 10.33%, #a9dbb8 73.15%)";
    // }

    // //6
    // else if (props.index === 6) {
    //   const dd6 = document.getElementById("d6");
    //   const dd5 = document.getElementById("d5");

    //   dd6.style.width = "1.3rem";
    //   dd6.style.height = "1.3rem";
    //   dd6.style.transition = "0.5s";
    //   dd6.style.background = "white";

    //   dd5.style.width = "1rem";
    //   dd5.style.height = "1rem";
    //   dd5.style.transition = "0.5s";
    //   dd5.style.background =
    //     "linear-gradient(208.07deg, #40e0d0 10.33%, #a9dbb8 73.15%)";
    // }
  }, [props.index]);

  return (
    <div className={classes.dotContainer}>
      <div className={classes.dot} id="d1"></div>
      <div className={classes.dot} id="d2"></div>
      <div className={classes.dot} id="d3"></div>
      <div className={classes.dot} id="d4"></div>
      {/* <div className={classes.dot} id="d5"></div>
      <div className={classes.dot} id="d6"></div> */}
    </div>
  );
};

export default DotContainer;
