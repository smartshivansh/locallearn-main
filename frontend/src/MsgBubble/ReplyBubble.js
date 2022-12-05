import { useState } from "react";

import classes from "./ReplyBubble.module.css";

import { ReactComponent as DownFill } from "../images/thumbsdownfill.svg";
import { ReactComponent as UpFill } from "../images/thumbsupfill.svg";
import { ReactComponent as UpVoid } from "../images/thumbsupvoid.svg";
import { ReactComponent as DownVoid } from "../images/thumbsdownvoid.svg";

const ReplyBubble = (props) => {
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);

  // const clickHandler = () => {
  //   setShowReactionPanel((prevVal) => !prevVal);
  // };

  function thumbsUpHandler(e) {
    setUp((prevVal) => !prevVal);
    setDown((prevVal) => false);
    return;
  }

  function thumbsDownHandler() {
    setUp((prevVal) => false);
    setDown((prevVal) => !prevVal);
    return;
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
