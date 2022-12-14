import React, { useState } from "react";
import classes from "./ForgetPassword.module.css";
import Spinners from "../Spinner/Spinner";
import { useForm } from "react-hook-form";
import NewPasswordSucessScreen from "./NewPasswordSucessScreen";

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (sucess) {
    return <NewPasswordSucessScreen />;
  }

  const email = localStorage.getItem("email");

  const formSubmitHandler = (datas) => {
    setLoading(true);

    const { password, conpassword } = datas;
    if (password.length < 8) {
      setLoading(false);
      setPasswordError("minimum 8 characters required");
    }
    if (password !== conpassword) {
      setPasswordError("password mismatch");
      setLoading(false);
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
          setSucess(true);
        }
      });
  };

  function focusHandler() {
    setPasswordError("");
  }

  return (
    <div className={classes.container}>
      {loading && <Spinners />}
      <div className={classes.left}>
        <h1 className={classes.welcome}>Welcome to LOCALLEARN</h1>
        <h4 className={classes.doions}>Powered By Doions Pvt Ltd</h4>
      </div>
      <div className={classes.right}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <p className={classes.heading}>Please login your email/contact No</p>
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
