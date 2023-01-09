import React, { useState } from "react";
import classes from "./SignupDetail.module.css";
import Spinners from "../Spinner/Spinner";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userDataUpdate } from "../Redux/Store";
import { validate } from "email-validator";
import apis from "../Constants/api";

import logo from "../images/logoblack.svg";

import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailInputColor, setEmailInputColor] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  setTimeout(() => {
    localStorage.removeItem("forget");
  }, 1000 * 60 * 8);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const emailValidator = (email) => {
    if (validate(email)) {
      setEmailInputColor(null);
      setEmailError(null);
      return true;
    } else {
      if (isNaN(email)) {
        setEmailInputColor("red");
        setEmailError("Invalid email Address");
        return false;
      }
      if (email.length !== 10) {
        setEmailInputColor("red");
        setEmailError("Phone number must have 10 digit");
        return false;
      } else {
        setEmailInputColor(null);
        setEmailError(null);
        return true;
      }
    }
  };

  const emailBlurHandler = (e) => {
    emailValidator(e.target.value);
  };

  const formSubmitHandler = (datas) => {
    setLoading(true);

    const { email } = datas;

    fetch(`${apis.forgetPassword}`, {
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
          dispatch(
            userDataUpdate({
              email: email,
              name: "",
              username: "",
            })
          );
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
            style={{ borderColor: emailInputColor }}
            onBlurCapture={emailBlurHandler}
            autoComplete="off"
            {...register("email", {
              minLength: {
                value: 1,
                message: "please enter a valid Value",
              },
              required: "this field is mandatory",
            })}
          />
          <p className={classes.errorMsg}>
            {errors.loginId?.message} {emailError}
          </p>

          <input
            type="submit"
            placeholder="submit"
            className={classes.submit}
          />
          {/* <p className={classes.doions}>Powered by Doions Pvt Ltd</p> */}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
