import classes from "./MenuButton.module.css";

const MenuButton = (props) => {
  return (
    <div className={classes.container} onClick={props.onClick}>
      <div className={classes.line}></div>
      <div className={classes.line}></div>
      <div className={classes.line}></div>
    </div>
  );
};

export default MenuButton;
