import React, { useState, useEffect } from "react";

import classes from "./Chips.module.css";
import xixon from "../images/xchip.svg";

const Chips = (props) => {
  const [selected, setSelected] = useState(props.selected);
  const [bgColor, setBGColor] = useState(null);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (selected) {
      setBGColor("#40e0d0");
      setColor("white");
      props.onClick(props.content, "add");
    }
  }, []);

  function onClickHandler() {
    setSelected((prevVal) => !prevVal);

    if (!selected) {
      setBGColor("#40e0d0");
      setColor("white");
      props.onClick(props.content, "add");
    } else {
      setBGColor("white");
      setColor("black");
      props.onClick(props.content, "remove");
    }
  }

  return (
    <div
      className={classes.chips}
      onClick={onClickHandler}
      style={{
        backgroundColor: bgColor,
        color: color,
        justifyContent: selected ? "space-around" : "center",
      }}
    >
      <div className={classes.content}>{props.content}</div>
      {selected && <img alt="imag" src={xixon} className={classes.xicon} />}
    </div>
  );
};

export default React.memo(Chips);
