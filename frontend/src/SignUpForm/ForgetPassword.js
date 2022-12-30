import React, { useState } from "react";
import classes from "./SignupDetail.module.css";
import Spinners from "../Spinner/Spinner";
import { useForm } from "react-hook-form";

import logo from "../images/logoblack.svg";

import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  localStorage.setItem("forget", true);
  setTimeout(() => {
    localStorage.removeItem("forget");
  }, 1000 * 60 * 8);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = (datas) => {
    setLoading(true);

    const { email } = datas;

    fetch("http://doornextshop.com/forget-password", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => JSON.parse(data))
      .then((data) => {
        if (!data.sucess) {
          alert(data.msg);
          setLoading(false);
        } else {
          setLoading(false);
          localStorage.setItem("email", email);
          navigate("/app/forgetotp");
        }
      });
  };

  return (
    <div className={classes.mainContainer}>
      {loading && <Spinners />}
      <div className={classes.left}>
        <img src={logo} alt="locallearnlogo" className={classes.img} />
      </div>
      <div className={classes.right}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <p className={classes.formHeading}>
            Please login your email/contact No
          </p>
          <input
            placeholder="Enter your email/phone"
            className={classes.input}
            autoComplete="off"
            {...register("email", {
              minLength: {
                value: 1,
                message: "please enter a valid Value",
              },
              required: "this field is mandatory",
            })}
          />
          <p className={classes.errorMsg}>{errors.loginId?.message}</p>

          <input
            type="submit"
            placeholder="submit"
            className={classes.submit}
          />
          <p className={classes.doions}>Powered by Doions Pvt Ltd</p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
