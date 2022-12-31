import React, { useState } from "react";
import Spinners from "../Spinner/Spinner";
import { useForm } from "react-hook-form";
import NewPasswordSucessScreen from "./NewPasswordSucessScreen";
import { useSelector } from "react-redux";
import logo from "../images/logoblack.svg";
import classes from "./SignupDetail.module.css";

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const email = useSelector((state) => state.userdata.email);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (sucess) {
    return <NewPasswordSucessScreen />;
  }

  const formSubmitHandler = (datas) => {
    setLoading(true);

    const { password, conpassword } = datas;
    if (password.length < 8) {
      setLoading(false);
      setPasswordError("minimum 8 characters required");
      return;
    }
    if (password !== conpassword) {
      setPasswordError("password mismatch");
      setLoading(false);
      return;
    }

    fetch("http://doornextshop.com/newpassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => JSON.parse(data))
      .then((data) => {
        if (!data.sucess) {
          alert(data.msg);
        } else {
          setLoading(false);
          localStorage.setItem("isLoggedIn", true);
          setSucess(true);
        }
      });
  };

  function focusHandler() {
    setPasswordError("");
  }

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
            placeholder="please enter new password"
            className={classes.input}
            type="password"
            onFocus={focusHandler}
            autoComplete="off"
            {...register("password", {
              minLength: {
                value: 1,
                message: "please enter a valid Value",
              },
              required: "this field is mandatory",
            })}
          />
          <p className={classes.errorMsg}>{errors.loginId?.message}</p>
          <input
            placeholder="confirm password"
            className={classes.input}
            autoComplete="off"
            onFocus={focusHandler}
            type="password"
            {...register("conpassword", {
              minLength: {
                value: 1,
                message: "minimum 8 characters required",
              },
              required: "this field is mandatory",
            })}
          />
          <p className={classes.errorMsg}>
            {passwordError}
            {errors.loginId?.message}
          </p>

          <input
            type="submit"
            placeholder="submit"
            className={classes.submit}
          />
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
