import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DotContainer from "./dotContainer";

import classes from "./QuestionSelector.module.css";

function QuestionSelector(props) {
  const [transform, setTransform] = useState(0);
  const [answer, setAnswer] = useState(props.options[0]);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      response: { answers: [answer], id: props.id },
      email: localStorage.getItem("email"),
    });
    props.onClick();
    setTransform((prevVal) => prevVal - 110);

    try {
      fetch("http://doornextshop.com/questions", {
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
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
