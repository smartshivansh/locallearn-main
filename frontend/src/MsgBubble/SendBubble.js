import classes from "./SendBubble.module.css";

import React, { useEffect } from "react";

const SendBubble = (props) => {
  useEffect(() => {
    if (props.content.length <= 10) {
      return;
    }
    const timer = setTimeout(() => {
      fetch("http://doornextshop.com/quesans", {
        method: "POST",
        body: JSON.stringify({
          email: "8319007235",
          data: props.content,
          type: "question",
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json)
        .then((res) => JSON.parse(res));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {props.children}
      <div className={classes.bubble}>{props.content}</div>
    </div>
  );
};

export default React.memo(SendBubble);
