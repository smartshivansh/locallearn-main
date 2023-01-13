import React, { useEffect, useState } from "react";
import { validate } from "email-validator";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { passwordStrength } from "check-password-strength";

import classes from "./SignupDetail.module.css";

import Spinners from "../Spinner/Spinner";
import { useDispatch } from "react-redux";
import { userDataUpdate } from "../Redux/Store";
import { authStatusLogin } from "../Redux/Store";

import logo from "../images/logoblack.svg";
import showeye from "../images/eye.svg";
import hideeye from "../images/eyekati.svg";
import apis from "../Constants/api";

const SignUpDetail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [usernameError, setUsernameError] = useState("");
  const [usernameInputColor, setUsernameInputColor] = useState(null);
  const [tocError, setTocError] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [eye, setEye] = useState(hideeye);
  const [passwordType, setPasswordType] = useState("password");

  const [emailError, setEmailError] = useState("");
  const [emailInputColor, setEmailInputColor] = useState(null);

  const [passwordError, setPasswordError] = useState("");
  const [passwordInputColor, setPasswordInputColor] = useState(null);

  const [passStrengthColor, setPassStrengthColor] = useState("red");

  const [loading, setLoading] = useState(false);

  const cpassword = watch("confirmPassword");
  const password = watch("password");
  const emails = watch("email");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      console.log("rferfg");
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

    if(e.target.value===""){
      setEmailInputColor("red");
      setEmailError("Email field can't be empty")
      return;
    }
    emailValidator(e.target.value);
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
    passwordValidator(password, cpassword);
  };


  async function formSubmitHandler(data) {
    setEmailError("");
    setUsernameError("");
    setPasswordError("");

    if (
      !emailValidator(data.email) ||
      !passwordValidator(data.password, data.confirmPassword)
    ) {
      return;
    }
    if (!data.agree) {
      setTocError("Please accept Terms and Condition");
      return;
    }
    const { email, password, username, name } = data;

    const submissionData = {
      email: email,
      password: password,
      username: username,
      name: name,
    };

    const datas = JSON.stringify(submissionData);
    //http://doornextshop.com
    setLoading(true);
    dispatch(userDataUpdate({ email, username, name }));
    await fetch(`${apis.usernamecheck}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((data) => JSON.parse(data))
      .then((result) => {
        if (!result.sucess) {
          setUsernameError(`${result.message}`);
          setUsernameInputColor("red")
          setLoading(false);
          return;
        } else {
          fetch(`${apis.signup}`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: datas,
          })
            .then((res) => res.json())
            .then((data) => JSON.parse(data))
            .then((result) => {
              if (result.invalid) {
                setEmailError("invalid input");
                setLoading(false);
                return;
              }
              if (result.sucess) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("email", email);
                dispatch(authStatusLogin({ token: result.token }));
                dispatch(userDataUpdate({ email, username, name }));
                setLoading(false);
                navigate("/app/otplogin");
              } else {
                setEmailError(`${result.message}`);
                setLoading(false);
              }
            });
        }
      });
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
          <p className={classes.formHeading}>To register, please sign up.</p>

          <input
            className={classes.input}
            placeholder="Enter your email/phone"
            style={{ borderColor: emailInputColor }}
            onBlurCapture={emailBlurHandler}
            type="text"
            autoComplete="off"
            {...register("email", {
              required: "This field can't be Empty"
            })}
          />
          <p className={classes.errorMsg}>
            {errors.email?.message || emailError}
          </p>
          <input
            className={classes.input}
            placeholder="Enter your name"
            type="text"
            autoComplete="off"
            {...register("name", {
              required: "Name field can't be empty"
            })}
          />
          <p className={classes.errorMsg}>{errors.name?.message}</p>
          <input
            className={classes.input}
            placeholder="Username"
            style={{ borderColor: usernameInputColor }}
            type="text"
            autoComplete="off"
            {...register("username", {
              required: "Username field can't be empty",
            })}
          />
          <p className={classes.errorMsg}>
            {errors.username?.message || usernameError}
          </p>

          {/* //password */}

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
                  required: "Password field can't be empty"
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
              {...register("confirmPassword", {
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

          <p className={classes.errorMsg}>
            {errors.confirmPassword?.message || passwordError}
            
          </p>
          <label className={classes.checkbox}>
            <input
              className={classes.checkboxtick}
              type="checkbox"
              {...register("agree")}
            />
            <p className={classes.declaration}>
              By creating an account you are agreeing to our{" "}
              <a
                href="/toc"
                className={classes.dlink}
                rel="noreferrer"
                target="_blank"
              >
                Terms and Conditions
              </a>{" "}
              ,
              <a
                href="/privacy"
                className={classes.dlink}
                rel="noreferrer"
                target="_blank"
              >
                Privacy Policy
              </a>
              and{" "}
              <a
                href="/ethics"
                className={classes.dlink}
                rel="noreferrer"
                target="_blank"
              >
                Ethics
              </a>
            </p>
          </label>
          <p className={classes.errorMsg}>{tocError}</p>
          <input type="submit" className={classes.submit} />
          <p className={classes.login}>
            Already have an account?{" "}
            <a href="/app/login" className={classes.link}>
              Login
            </a>
          </p>
          {/* <p className={classes.doions}>Powered by Doions Pvt Ltd</p> */}
        </form>
      </div>
    </div>
  );
};

export default SignUpDetail;
