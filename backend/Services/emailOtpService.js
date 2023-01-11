var rn = require("random-number");
var validator = require("email-validator");

const emailOtpService = () => {
  let options = {
    min: 100000,
    max: 999999,
    integer: true,
  };

  const otp = rn(options);

  try {
    if (validator.validate(email)) {
      const mailOptions = {
        from: "in@myty.in",
        to: email,
        subject: "OTP from LocalLearn",
        text: "Your OTP for LocalLerarn Registration is " + otp,
      };
      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(1111, err);
          return res
            .status(200)
            .json(
              JSON.stringify({ sucess: false, message: "failed to send email" })
            );
        } else {
          return res
            .status(200)
            .json(
              JSON.stringify({ message: "otp send sucessfully", sucess: true })
            );
        }
      });
    }
  } catch (error) {}
};
