import { useState } from "react";
import { useNavigate } from "react-router";
import OTPInput from "otp-input-react";
import { useSelector } from "react-redux";

import Spinners from "../Spinner/Spinner";

import classes from "./SignupDetail.module.css";

import logo from "../images/logoblack.svg";

const ForgetPasswordOtp = () => {
  const [otp, setOtp] = useState();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = useSelector((state) => state.userdata.email);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const data = JSON.stringify({ otp, email });
    setLoading(true);
    fetch("http://doornextshop.com/otpverify", {
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
          setLoading(false);
          navigate("/app/newpass");
        } else {
          setContent("Incorrect OTP");
          setLoading(false);
        }
      });
  };

  const onFocusHandler = () => {
    setContent("");
  };

  const resendOtpHandler = () => {
    setLoading(true);
    fetch("http://doornextshop.com/resendotp", {
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
          <h4 className={classes.doions}>Powered By Doions Pvt Ltd</h4>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordOtp;
