import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "email-validator";
import {
  userDataUpdate,
  locationUpdate,
  professionUpdate,
  addGoodSkill,
  addLearnSkill,
  authStatusLogin,
} from "../Redux/Store";

import classes from "./SignupDetail.module.css";
import logo from "../images/logoblack.svg";

import { useForm } from "react-hook-form";
import PreChatScreen from "./PreChatScreen";
import Spinners from "../Spinner/Spinner";
import apis from "../Constants/api";

import showeye from "../images/eye.svg";
import hideeye from "../images/eyekati.svg";

const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailInputColor, setEmailInputColor] = useState(null);

  const [showpassword, setShowPassword] = useState(false);
  const [eye, setEye] = useState(hideeye);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInputColor, setPasswordInputColor] = useState(null);

  const dispatch = useDispatch();

  const showPasswordHandler = () => {
    if (!showpassword) {
      setEye(showeye);
      setPasswordType("text");
      setShowPassword((p) => !p);
    } else {
      setEye(hideeye);
      setPasswordType("password");
      setShowPassword((p) => !p);
    }
  };

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
    if(e.target.value === ""){
      return;
    }
    emailValidator(e.target.value);
  };

  async function formSubmitHandler(datas) {
    const { loginId, password } = datas;

    if(loginId === ""){
      setEmailError("This field can't be empty")
      setEmailInputColor("red");
      return;
    }

    if(!emailValidator(loginId)){
      return;
    }

    setLoading(true);
    await fetch(`${apis.signin}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: loginId, password }),
    })
      .then((res) => res.json())
      .then((data) => JSON.parse(data))
      .then((data) => {
        if (data.sucess) {
          // navigate("/app/loginsucess");
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("token", data.user.token);
          dispatch(authStatusLogin({ token: data.user.token }));
          setLoading(false);
          dispatch(
            userDataUpdate({
              email: data.user.email,
              name: data.user.name,
              username: data.user.username,
            })
          );
          dispatch(locationUpdate({ location: data.user.location }));
          dispatch(professionUpdate({ profession: data.user.profession }));
          dispatch(addGoodSkill({ goodskills: data.user.goodSkills }));
          dispatch(addLearnSkill({ learnskills: data.user.learnSkills }));
          navigate("/app/chatHelper");
        } else {
          if(data.message === "Wrong Password"){
            setPasswordError("Wrong Password")
            setPasswordInputColor("red")
          }
          else if(data.message === "Email ID not registered"){
            setEmailError("Email ID not registered")
            setEmailInputColor("red")
          }
          setLoading(false);
        }
      });
  }

  if (sucess) {
    return <PreChatScreen />;
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
          <p className={classes.formHeading}>Please login to continue</p>
          <input
            placeholder="Enter your email/phone"
            className={classes.input}
            autoComplete="off"
            style={{ borderColor: emailInputColor }}
            onBlurCapture={emailBlurHandler}
            {...register("loginId", {
              required: "This field can't be Empty"
            })}
          />
          <p className={classes.errorMsg}>
            {errors.loginId?.message || emailError}
          </p>
          <div
            className={classes.passwordInputBox}
          >
            <input
              placeholder="Password"
              className={classes.passwordInput}
              style={{ borderColor: passwordInputColor }}
              type={passwordType}
              autoComplete="off"
              {...register("password", {
                minLength: {
                  value: 10,
                  message: "Password must be 10 digit long",
                },
                required: "Password field can't be empty"
              })}
              onFocus={() => {
                setPasswordError("");
              }}
            />
            <img
              src={eye}
              alt="show password"
              className={classes.passwordImg}
              onClick={showPasswordHandler}
            />
          </div>
          <p className={classes.errorMsg}>{errors.password?.message || passwordError}</p>
          <input
            type="submit"
            placeholder="submit"
            className={classes.submit}
          />

          <p className={classes.login}>
            Don???t have an account?{" "}
            <a href="/app/signup" className={classes.link}>
              Sign-in
            </a>
          </p>
          <div
            onClick={() => {
              localStorage.clear();
              localStorage.setItem("forget", true);
              navigate("/app/forget");
            }}
            className={classes.login}
          >
            <p className={classes.link}>Forgot password?</p>
          </div>
          {/* <p className={classes.doions}>Powered by Doions Pvt Ltd</p> */}
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
