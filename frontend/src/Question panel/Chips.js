import React, { useState, useEffect } from "react";

import classes from "./Chips.module.css";

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
      setColor("#40e0d0");
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
      {props.content}
      {selected && <div className={classes.xicon}></div>}
    </div>
  );
};

export default React.memo(Chips);
