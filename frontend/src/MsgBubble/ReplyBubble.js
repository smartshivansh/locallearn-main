import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./ReplyBubble.module.css";

import { ReactComponent as DownFill } from "../images/thumbsdownfill.svg";
import { ReactComponent as UpFill } from "../images/thumbsupfill.svg";
import { ReactComponent as UpVoid } from "../images/thumbsupvoid.svg";
import { ReactComponent as DownVoid } from "../images/thumbsdownvoid.svg";

const ReplyBubble = (props) => {
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const email = useSelector((state) => state.userdata.email);

  function thumbsUpHandler(e) {
    setUp((prevVal) => !prevVal);
    setDown((prevVal) => false);
    let response;
    if (up) {
      response = "no response";
    } else {
      response = "liked";
    }

    fetch("http://localhost:5000/response", {
      method: "POST",
      body: JSON.stringify({ email, answer: props.content, response }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function thumbsDownHandler() {
    setUp((prevVal) => false);
    setDown((prevVal) => !prevVal);
    let response;
    if (down) {
      response = "no response";
    } else {
      response = "unliked";
    }

    fetch("http://localhost:5000/response", {
      method: "POST",
      body: JSON.stringify({ email, answer: props.content, response }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.content === "Hi there! How are you?") {
        return;
      }
      fetch("http://localhost:5000/quesans", {
        method: "POST",
        body: JSON.stringify({
          email: "8319007235",
          data: props.content,
          type: "answer",
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
    <div className={classes.container}>
      <div className={classes.bubble}>{props.content}</div>
      <div className={classes.reactionPanel}>
        <div className={classes.thumbsDown} onClick={thumbsDownHandler}>
          {down ? <DownFill /> : <DownVoid />}
        </div>
        <div className={classes.thumbsUp} onClick={thumbsUpHandler}>
          {up ? <UpFill /> : <UpVoid />}
        </div>
      </div>
    </div>
  );
};

export default ReplyBubble;
