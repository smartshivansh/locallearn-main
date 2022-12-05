import React, { useState, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import classes from "./QuestionPanel.module.css";

import Chips from "./Chips";
import FixedOptions from "./FixedOptions";

const QuestionPanel = (props) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [selections, setSelections] = useState([]);
  const [customize, setCustomize] = useState([]);

  const options = useMemo(() => [...props.options], [props]);

  const customRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const len = selections.length + customize.length;

    if (len < props.min) {
      alert(`Select atleast ${props.min}`);
      return;
    } else if (len > props.max) {
      alert(`Select atmost ${props.max}`);
      return;
    }
    props.onClick();
    setValue((prevVal) => prevVal - 110);

    const data = JSON.stringify({
      response: { answers: [...selections, ...customize], id: props.id },
      email: localStorage.getItem("email"),
    });

    try {
      fetch("http://doornextshop.com/questions", {
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => JSON.parse(data))
        .then(() => {
          if (props.last) {
            props.sucess();
          }
        });
    } catch (error) {
      console.log("error");
      if (props.last) {
        props.sucess();
      }
    } finally {
      if (props.last) {
        props.sucess();
      }
    }
  };

  const chipClickHandler = useCallback((title, token) => {
    if (token === "remove") {
      setSelections((prevVal) => {
        return prevVal.filter((ele) => {
          if (ele !== title) {
            return ele;
          }
        });
      });
    } else {
      setSelections((prevVal) => [...prevVal, title]);
    }
  }, []);

  const customChipClickHandler = (title, token) => {
    if (token === "remove") {
      setCustomize((prevVal) =>
        prevVal.filter((option) => {
          if (option !== title) {
            return option;
          }
        })
      );
    }
  };

  const addInputHandler = () => {
    if (customRef) {
      if (customRef.current) {
        const val = customRef.current.value;

        if (val.trim().length === 0) {
          return;
        }
        console.log(val);
        setCustomize((prevVal) => [...prevVal, val]);
        customRef.current.value = "";
      }
    }
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addInputHandler();
    }
  });

  return (
    <div
      className={classes.container}
      style={{
        transform: `translateY(${value}%)`,
        transition: "0.5s",
      }}
    >
      <p className={classes.question}>{props.question}</p>

      <input
        type="text"
        placeholder="enter skill"
        className={classes.input}
        ref={customRef}
      />

      <div className={classes.chips}>
        {customize.map((option) => {
          return (
            <Chips
              content={option}
              key={Math.random() * 100000}
              onClick={customChipClickHandler}
              selected={true}
            />
          );
        })}

        <FixedOptions options={options} onClick={chipClickHandler} />
      </div>

      <button onClick={formSubmitHandler} className={classes.submit}>
        Some Text
      </button>

      {/* <input
        type="submit"
        onClick={formSubmitHandler}
        className={classes.submit}
        placeholder="some Text"
      /> */}
    </div>
  );
};

export default QuestionPanel;
