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

import classes from "./LoginScreen.module.css";

import { useForm } from "react-hook-form";
import PreChatScreen from "./PreChatScreen";
import Spinners from "../Spinner/Spinner";
import ForgetPassword from "./ForgetPassword";

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
  const [forget, setForget] = useState(false);
  const dispatch = useDispatch();

  if (forget) {
    return <ForgetPassword />;
  }

  async function formSubmitHandler(datas) {
    const { loginId, password } = datas;

    setLoading(true);
    await fetch("http://localhost:4000/signin", {
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
          setSucess(true);
          setLoading(false);
          dispatch(
            userDataUpdate({
              email: data.user.email,
              name: data.user.name,
              username: data.user.username,
            })
          );
          dispatch(locationUpdate(data.user.location));
          dispatch(professionUpdate(data.user.profession));
          dispatch(addGoodSkill(data.user.goodSkills));
          dispatch(addLearnSkill(data.user.learnSkills));
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
          <p className={classes.heading}>Please login to continue</p>
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

          <p className={classes.heading}>
            {" "}
            Don’t have an account?{" "}
            <div
              onClick={() => {
                navigate("/app/signup");
              }}
              className={classes.link}
            >
              Sign-in
            </div>
          </p>
          <div
            onClick={() => {
              setForget(true);
            }}
            className={classes.forget}
          >
            Forget password?
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
