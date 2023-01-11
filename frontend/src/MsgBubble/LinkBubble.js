import React, { useEffect } from "react";
import classes from "./LinkBubble.module.css";
import { useSelector } from "react-redux";

import apis from "../Constants/api";

const LinkBubble = (props) => {
  const l1 = props.message.length;
  const l2 = props.href.length;
  const index = props.message.match(props.href);

  const email = useSelector((state) => state.userdata.email);

  return (
    <div className={classes.container}>
      {/* <img href={"props.src"} alt="images" className={classes.image} /> */}
      <p className={classes.content}>
        {props.message.slice(0, index.index - 1) + " "}
        <a
          className={classes.url}
          href={props.href}
          target="_blank"
          rel="noreferrer"
        >
          {props.message.slice(index.index, index.index + l2)}
        </a>
        {props.message.slice(index.index + l2 + 1, l1)}
      </p>
    </div>
  );
};

export default LinkBubble;
