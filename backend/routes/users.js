const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// router.get("/users", userController.users);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/otpverify", userController.otpverify);
router.post("/signup-password", userController.signupPassword);
router.post("/logout", userController.logout);
router.post("/usernamecheck", userController.usernamecheck);
router.post("/questions", userController.questions);
router.post("/userdata", userController.userdata);
router.post("/resendotp", userController.resendOtp);
router.post("/finduser", userController.finduser);
router.post("/quesans", userController.questionAnswer);
router.post("/response", userController.responseUpdate);
router.post("/forget-password", userController.forgetPassword);
router.post("/newpassword", userController.newPassword);

// router.post('/email-send', userController.emailSend)
// router.post('/change-password', userController.changePassword)

//attaching pages in backend

router.get("/", (req, res) => {
  res.sendFile("/index.html");
});

module.exports = router;
