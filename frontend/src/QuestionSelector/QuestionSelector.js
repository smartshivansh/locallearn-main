import React, { useState } from "react";

import classes from "./QuestionSelector.module.css";

import { useDispatch, useSelector } from "react-redux";
import { locationUpdate, professionUpdate } from "../Redux/Store";

function QuestionSelector(props) {
  const [transform, setTransform] = useState(0);
  const [answer, setAnswer] = useState(props.options[0]);
  const email = useSelector((state) => state.userdata.email);

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let data;

    if (props.id === "q1") {
      dispatch(professionUpdate({ profession: answer }));
      data = { type: "profession", email, data: answer };
    }
    setTransform((prevVal) => prevVal - 110);

    fetch("http://doornextshop.com/userdata", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => props.onClick());
  };

  const selectorHandler = (e) => {
    setAnswer((prevVal) => e.target.value);
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
        <select
          className={classes.select}
          onChange={selectorHandler}
          value={answer}
        >
          {props.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <input type="submit" className={classes.submit} />
    </form>
  );
}

export default QuestionSelector;
