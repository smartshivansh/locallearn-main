import classes from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div>
      <header className={classes.header}>
        <h1>LOCALLEARN</h1>
        <div>
          <button className={classes.button}>Log in</button>
          <a href="/signup">
            <button className={classes.button}>Sign up</button>
          </a>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
