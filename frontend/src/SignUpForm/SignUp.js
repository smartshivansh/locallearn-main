import { useState } from "react";
import OTPInput from "otp-input-react";
import { useSelector } from "react-redux";

import SignInSuccessfull from "./SignInSuccessfull";
import Spinners from "../Spinner/Spinner";

import { useNavigate } from "react-router-dom";

import logo from "../images/logoblack.svg";
import classes from "./SignupDetail.module.css";

const SignUp = () => {
  const [otp, setOtp] = useState();
  const [content, setContent] = useState("");
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = useSelector((state) => state.userdata.email);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    const data = JSON.stringify({ otp, email });
    setLoading(true);
    fetch("https://locallearn.in/otpverify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => JSON.parse(res))
      .then((data) => {
        if (data.msg === "OTP_MATCHED") {
          // navigate("/app/sucess");
          setSucess(true);
          setLoading(false);
          localStorage.setItem("isLoggedIn", true);
        } else {
          setContent("Incorrect OTP");
          setOtp(null);
          setLoading(false);
        }
      });
  };

  if (sucess) {
    return <SignInSuccessfull />;
  }

  const onFocusHandler = () => {
    setContent("");
  };

  const resendOtpHandler = () => {
    setLoading(true);
    fetch("https://locallearn.in/resendotp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => setLoading(false));
  };

  return (
    <div className={classes.mainContainer}>
      {loading && <Spinners />}
      <div className={classes.left}>
        <img src={logo} alt="locallearnlogo" className={classes.img} />
      </div>
      <div className={classes.right}>
        <form className={classes.form} onSubmit={formSubmitHandler}>
          <h3 className={classes.formHeading}>
            Please enter the OTP we have sent on your registered mobile/email.
          </h3>

          <OTPInput
            value={otp}
            onChange={setOtp}
            autoFocus
            OTPLength={6}
            otpType="number"
            disabled={false}
            className={classes.otpInput}
          />
          <p className={classes.error}>{content}</p>
          <button className={classes.submit}>Let's get started</button>
          <div className={classes.link} onClick={resendOtpHandler}>
            Resend otp
          </div>
          <p className={classes.doions}>Powered By Doions Pvt Ltd</p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
