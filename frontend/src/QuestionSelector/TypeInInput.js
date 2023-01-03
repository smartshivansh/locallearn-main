import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationUpdate, professionUpdate } from "../Redux/Store";

import classes from "./QuestionSelector.module.css";

const TypeInput = (props) => {
  const [transform, setTransform] = useState(0);
  const [value, setValue] = useState("Jabalpur");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userdata.email);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (value.trim() < 1) {
      setError("please enter a valid value");
      return;
    }
    setTransform(-110);

    let data;
    if (props.id === "q2") {
      dispatch(locationUpdate({ location: value }));
      data = { type: "location", email, data: value };
    }

    fetch("https://locallearn.in/userdata", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => props.onClick());
  };

  const onChangeHandler = (e) => {
    setValue((prevVal) => e.target.value);
  };

  const onFocusHandler = () => {
    setError("");
  };

  return (
    <form
      className={classes.form}
      onSubmit={formSubmitHandler}
      style={{ transform: `translateY(${transform}%)`, transition: "0.5s" }}
      id={props.id}
    >
      <div className={classes.question}>
        <p>{props.question}</p>
        <input
          onFocus={onFocusHandler}
          onChange={onChangeHandler}
          value={props.value ? props.value : value}
          className={classes.select}
          autoFocus
          autoCapitalize={value}
          style={{ padding: "2%" }}
          placeholder={
            props.placeholder ? props.placeholder : "Jabalpur, Madhya Pradesh"
          }
        />
      </div>
      <input type="submit" className={classes.submit} />
      <p className={classes.error}>{error}</p>
    </form>
  );
};

export default TypeInput;
