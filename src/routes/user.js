const express = require("express");
const router = express.Router();

const UserController = require("../controller/user");
const { loginValidateSchema, signupValidateSchema } = require("../model/user");
const validateMiddleware = require("../middleware/validate");

router.post(
  "/login",
  validateMiddleware(loginValidateSchema),
  UserController.login
);
router.post(
  "/register",
  validateMiddleware(signupValidateSchema),
  UserController.register
);
// router.post("/resetpassword", AuthController.resetPassword);
// router.post("/confirmAccount", AuthController.confirmAccount);
// router.get("/userlist/", AuthController.listUsers);
// router.post("/contactus", AuthController.contactus);

module.exports = router;
