import React, { useRef, useCallback } from "react";

import classes from "./Composer.module.css";

import SendButton from "./SendButon";
// import SpotifyIcon from "./SpotifyIcon";

const Composer = (props) => {
  const msgRef = useRef();

  document.addEventListener("keypress", function (e) {
    if (e.code === "Enter") {
      sendHandler();
    }
  });

  const sendHandler = useCallback(() => {
    if (msgRef) {
      props.onSend("text", msgRef.current.value);
      msgRef.current.value = "";
    }
  }, [msgRef]);

  return (
    <div className={classes.container} id="container">
      <input
        className={classes.input}
        ref={msgRef}
        placeholder={props.placeholder}
        autoFocus
      ></input>
      <SendButton onClick={sendHandler} />
    </div>
  );
};

export default React.memo(Composer);
