import React from "react";
import classes from "./LinkBubble.module.css";

const LinkBubble = (props) => {
  const l1 = props.message.length;
  const l2 = props.href.length;
  const index = props.message.match(props.href);

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
