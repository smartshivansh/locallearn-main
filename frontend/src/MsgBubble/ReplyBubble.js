import { useState } from "react";
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

  // const clickHandler = () => {
  //   setShowReactionPanel((prevVal) => !prevVal);
  // };

  function thumbsUpHandler(e) {
    setUp((prevVal) => !prevVal);
    setDown((prevVal) => false);
    let response;
    if (up) {
      response = "no response";
    } else {
      response = "liked";
    }

    fetch("https://locallearn.in/response", {
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

    fetch("https://locallearn.in/response", {
      method: "POST",
      body: JSON.stringify({ email, answer: props.content, response }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

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
