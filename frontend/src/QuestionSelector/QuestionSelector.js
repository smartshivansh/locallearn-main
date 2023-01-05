import React, { useState } from "react";

import classes from "./QuestionSelector.module.css";

import xIcon from "../images/xblack.svg";

import { useDispatch, useSelector } from "react-redux";
import { locationUpdate, professionUpdate } from "../Redux/Store";

function QuestionSelector(props) {
  const [transform, setTransform] = useState(0);
  const [answer, setAnswer] = useState(props.options[0]);
  const [selectDisplay, setSelectDisplay] = useState("block");
  const [typeDisplay, setTypeDisplay] = useState("none");
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

  const selectorHandler = (e) => {
    setAnswer((prevVal) => e.target.value);

    if (e.target.value === "Other") {
      setSelectDisplay("none");
      setTypeDisplay("block");
      setAnswer((prevVal) => "");
    }
  };

  const typeInputHandler = () => {
    setSelectDisplay("block");
    setTypeDisplay("none");
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
          style={{ display: `${selectDisplay}` }}
        >
          {props.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div className={classes.select} style={{ display: `${typeDisplay}` }}>
          <input
            onChange={selectorHandler}
            value={answer}
            placeholder="Profession"
            className={classes.input}
            autoFocus
          />
          <img
            className={classes.cancelIcon}
            src={xIcon}
            alt="cancel"
            onClick={typeInputHandler}
          />
        </div>
      </div>
      <input type="submit" className={classes.submit} />
    </form>
  );
}

export default QuestionSelector;
