import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import classes from "./SignupDetail.module.css";
import SignUp from "./SignUp.js";
import Spinners from "../Spinner/Spinner";
import { useDispatch } from "react-redux";
import { userDataUpdate } from "../Redux/Store";

const SignUpDetail = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const [usernameBorder, setUsernameBorder] = useState(null);
  // const [passwordStrength, setPasswordStrength] = useState("Weak");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [signup, setSignup] = useState(false);

  const [loading, setLoading] = useState(false);

  const password = watch("confirmPassword");
  const username = watch("username");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function formSubmitHandler(data) {
    if (data.confirmPassword !== data.password) {
      setPasswordError("password mismatch");
      return;
    }
    if (!data.agree) {
      alert("please accept Terms and condition");
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

    setLoading(true);
    dispatch(userDataUpdate({ email, username, name }));
    await fetch("http://localhost:4000/usernamecheck", {
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
          return;
        } else {
          fetch("http://localhost:4000/signup", {
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
                return;
              }
              if (result.sucess) {
                localStorage.setItem("email", `${email}`);
                dispatch(userDataUpdate({ email, username, name }));
                setSignup(true);
                setLoading(false);
                // navigate("/app/signups");
              } else {
                setEmailError(`${result.message}`);
                setLoading(false);
              }
            });
        }
      });
  }

  // const usernameBlurHandler = () => {
  //   try {
  //     fetch(`http://localhost:5000/${username}`)
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         if (!data) {
  //           setUsernameBorder("2px solid red");
  //           alert("username already taken");
  //         }
  //       });
  //   } catch (e) {
  //     console.log(e, "error");
  //   }
  // };

  // const usernameFocusHandler = () => {
  //   setUsernameBorder("1px solid #c4c4c4");
  // };

  if (signup) {
    return <SignUp />;
  }

  return (
    <div className={classes.mainContainer}>
      {loading && <Spinners />}
      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <div className={classes.left}>
            <p className={classes.welcome}>Welcome to locallearn</p>
          </div>

          <div className={classes.right}>
            <form
              className={classes.form}
              onSubmit={handleSubmit(formSubmitHandler)}
            >
              <p>To register, please sign up.</p>

              <input
                className={classes.input}
                placeholder="Enter your email/phone"
                type="text"
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
                {errors.email?.message} {emailError}
              </p>
              <input
                className={classes.input}
                placeholder="Enter your name"
                type="text"
                autoComplete="off"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "please enter a valid Value",
                  },
                  required: "this field is mandatory",
                })}
              />
              <p className={classes.errorMsg}>{errors.name?.message}</p>
              <input
                className={classes.input}
                placeholder="Username"
                type="text"
                autoComplete="off"
                {...register("username", {
                  minLength: 1,
                  required: "this field is mandatory",
                })}
                // onBlur={usernameBlurHandler}
                // onFocus={usernameFocusHandler}
                // style={{
                //   border: `${usernameBorder}`,
                // }}
              />
              <p className={classes.errorMsg}>
                {errors.username?.message} {usernameError}
              </p>
              {/* <div className={classes.password}> */}
              <input
                className={classes.input}
                // id={classes.password}
                placeholder="Password"
                type="password"
                autoComplete="off"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "minimum 8 charactes required",
                  },
                  required: "this field is mandatory",
                })}
              />
              {/* <p>{`Password Strength: ${passwordStrength}`}</p> */}
              <p className={classes.errorMsg}>{errors.password?.message}</p>
              {/* </div> */}

              <input
                className={classes.input}
                placeholder="Confirm password"
                type="password"
                autoComplete="off"
                {...register("confirmPassword", {
                  minLength: {
                    value: 8,
                    message: "minimum 8 charactes required",
                  },
                  required: "this field is mandatory",
                  validate: (value) => value === password,
                })}
                onFocus={() => {
                  setPasswordError("");
                }}
              />
              <p className={classes.errorMsg}>
                {errors.confirmPassword?.message}
                {passwordError}
              </p>
              <label className={classes.checkbox}>
                <input type="checkbox" {...register("agree")} />
                By creating an account you are agreeing to our Terms and
                Conditions and Privacy Policy
              </label>
              <input type="submit" className={classes.submit} />
              <p className={classes.login}>
                Already have an account?{" "}
                <div
                  onClick={() => {
                    navigate("/app/login");
                  }}
                  className={classes.link}
                >
                  Login
                </div>
              </p>
            </form>
          </div>
        </div>
        <p className={classes.doions}>Powered by Doions Pvt Ltd</p>
      </div>
    </div>
  );
};

export default SignUpDetail;
