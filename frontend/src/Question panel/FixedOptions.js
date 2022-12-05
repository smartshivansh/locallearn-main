import React from "react";

import classes from "./QuestionPanel.module.css";

import Chips from "./Chips";

const FixedOptions = (props) => {
  return (
    <div className={classes.chips}>
      {props.options.map((option) => {
        return (
          <Chips
            content={option}
            key={Math.random() * 100000}
            onClick={props.onClick}
            selected={false}
          />
        );
      })}
    </div>
  );
};

export default React.memo(FixedOptions);
