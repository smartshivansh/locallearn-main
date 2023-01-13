import React, { useState, useEffect } from "react";
import Spinners from "../Spinner/Spinner";
import { useForm } from "react-hook-form";
import NewPasswordSucessScreen from "./NewPasswordSucessScreen";
import { useSelector } from "react-redux";
import logo from "../images/logoblack.svg";
import classes from "./SignupDetail.module.css";

import { passwordStrength } from "check-password-strength";

import showeye from "../images/eye.svg";
import hideeye from "../images/eyekati.svg";
import apis from "../Constants/api";

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [eye, setEye] = useState(hideeye);
  const [passwordType, setPasswordType] = useState("password");
  const email = useSelector((state) => state.userdata.email);

  const [passwordInputColor, setPasswordInputColor] = useState(null);
  const [passStrengthColor, setPassStrengthColor] = useState("red");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const cpassword = watch("cPassword");

  const showPasswordHandler = () => {
    if (!showpassword) {
      setEye(hideeye);
      setPasswordType("text");
      setShowPassword((p) => !p);
    } else {
      setEye(showeye);
      setPasswordType("password");
      setShowPassword((p) => !p);
    }
  };

  useEffect(() => {
    if (
      passwordStrength(password).value === "Too weak" ||
      passwordStrength(password).value === "Weak"
    ) {
      setPassStrengthColor("red");
    } else if (passwordStrength(password).value === "Medium") {
      setPassStrengthColor("#ffa500");
    } else {
      setPassStrengthColor("green");
    }
  }, [password]);

  if (sucess) {
    return <NewPasswordSucessScreen />;
  }

  const formSubmitHandler = (datas) => {
    setLoading(true);

    // const { password, cpassword } = datas;
    if (password.length < 10) {
      setLoading(false);
      setPasswordError("Password must be 10 digit long");
      return;
    }
    if (password !== cpassword) {
      setPasswordError("Password mismatch");
      setLoading(false);
      return;
    }

    fetch(`${apis.newpassword}`, {
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

  const passwordValidator = (password, cpassword) => {
    setPasswordInputColor(null);
    setPasswordError("");
    if (password.length < 10) {
      setPasswordInputColor("red");
      setPasswordError("Password must contain 10 digits");
      return false;
    } else if (password !== cpassword) {
      setPasswordInputColor("red");
      setPasswordError("Password Mismatch");
      return false;
    }
    return true;
  };

  const passwordBlurHandler = (e) => {

    if(password === "" || cpassword === ""){
      setPasswordInputColor("red");
      setPasswordError("Password Field can't be empty");
      return;
    }

    passwordValidator(password, cpassword);
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
          <p className={classes.formHeading}>Please enter your new password</p>
          <div className={classes.passwordBox}>
            <div className={classes.passwordInputBox}>
              <input
                style={{ borderColor: passwordInputColor }}
                className={classes.passwordInput}
                placeholder="Password"
                type={passwordType}
                autoComplete="off"
                {...register("password", {
                  minLength: {
                    value: 10,
                    message: "Password must be 10 digit long",
                  },
                })}
              />
              <img
                src={eye}
                alt="show password"
                className={classes.passwordImg}
                onClick={showPasswordHandler}
              />
            </div>
            <div className={classes.pasStrength}>
              Password Strength:{" "}
              <p
                style={{ color: passStrengthColor }}
                className={classes.strength}
              >
                {passwordStrength(password).value}{" "}
              </p>
            </div>
          </div>

          <p className={classes.errorMsg}>{errors.password?.message}</p>

          {/* confirm passowrd */}

          <div
            className={classes.passwordInputBox}
            onBlurCapture={passwordBlurHandler}
          >
            <input
              placeholder="Confirm password"
              className={classes.passwordInput}
              style={{ borderColor: passwordInputColor }}
              type={passwordType}
              autoComplete="off"
              {...register("cPassword", {
                minLength: {
                  value: 10,
                  message: "Password must be 10 digit long",
                },
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

          <p className={classes.errorMsg}>
            {errors.confirmPassword?.message}
            {passwordError}
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
