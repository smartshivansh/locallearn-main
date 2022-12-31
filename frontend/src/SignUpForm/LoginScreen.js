import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  userDataUpdate,
  locationUpdate,
  professionUpdate,
  addGoodSkill,
  addLearnSkill,
} from "../Redux/Store";

import classes from "./SignupDetail.module.css";
import logo from "../images/logoblack.svg";

import { useForm } from "react-hook-form";
import PreChatScreen from "./PreChatScreen";
import Spinners from "../Spinner/Spinner";

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
  const dispatch = useDispatch();

  async function formSubmitHandler(datas) {
    const { loginId, password } = datas;

    setLoading(true);
    await fetch("https://locallearn.in/ignin", {
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
          navigate("/app/chat");
        } else {
          alert(data.message);
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
            {...register("loginId", {
              minLength: {
                value: 1,
                message: "please enter a valid Value",
              },
              required: "this field is mandatory",
            })}
          />
          <p className={classes.errorMsg}>{errors.loginId?.message}</p>
          <input
            type="password"
            placeholder="Enter password"
            className={classes.input}
            {...register("password", {
              minLength: {
                value: 8,
                message: "please enter a valid Value",
              },
              required: "this field is mandatory",
            })}
          />
          <p className={classes.errorMsg}>{errors.password?.message}</p>
          <input
            type="submit"
            placeholder="submit"
            className={classes.submit}
          />

          <p className={classes.login}>
            Don’t have an account?{" "}
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
          <p className={classes.doions}>Powered by Doions Pvt Ltd</p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
