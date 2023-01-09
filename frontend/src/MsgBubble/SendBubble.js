import classes from "./SendBubble.module.css";
import { useSelector } from "react-redux";

import React, { useEffect } from "react";
import apis from "../Constants/api";

const SendBubble = (props) => {
  const email = useSelector((state) => state.userdata.email);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.content === "Hi there! How are you?") {
        return;
      }
      fetch(`${apis.quesans}`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          data: {
            content: props.content,
            type: "text",
          },
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
