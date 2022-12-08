import React from "react";

import classes from "./SkillChip.module.css";

const SkillChip = (props) => {
  return <div className={classes.chip}>{props.text}</div>;
};

export default SkillChip;
