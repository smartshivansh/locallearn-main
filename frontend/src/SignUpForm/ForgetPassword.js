import React, { useState } from "react";
import classes from "./ForgetPassword.module.css";
import Spinners from "../Spinner/Spinner";
import { useForm } from "react-hook-form";
import ForgetPasswordOtp from "./FogetPasswordOtp";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (sucess) {
    return <ForgetPasswordOtp />;
  }

  const formSubmitHandler = (datas) => {
    setLoading(true);

    const { email } = datas;

    fetch("http://localhost:4000/forget-password", {
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
        } else {
          setLoading(false);
          setSucess(true);
        }
      });
  };

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
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
