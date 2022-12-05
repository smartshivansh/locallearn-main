import classes from "./FormBubble.module.css";

const FormBubble = (props) => {
  return (
    <div className={classes.bubble}>
      <form className={classes.form}>
        <input
          className={classes.input}
          type="text"
          placeholder="please enter your name"
        />
        <input
          className={classes.input}
          type="tel"
          placeholder="please enter your mobile No"
        />
        <input
          className={classes.input}
          type="file"
          placeholder="please select your image"
        />
        <input className={classes.submit} type="submit" />
      </form>
    </div>
  );
};

export default FormBubble;
