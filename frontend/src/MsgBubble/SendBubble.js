import classes from "./SendBubble.module.css";

const SendBubble = (props) => {
  return (
    <div>
      {props.children}
      <div className={classes.bubble}>{props.content}</div>
    </div>
  );
};

export default SendBubble;
