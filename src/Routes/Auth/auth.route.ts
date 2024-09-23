import { Router } from "express";
import {
  signUpValidationRules,
  otpValidationRules,
  emailValidationRules,
  loginValidationRules,
  refreshTokenValidationRules,
  resetPasswordValidationRules,
  otpRules,
} from "../../Middlewares/Auth/auth.middleware";

import {
  signUp,
  activateUserAccount,
  validateOTP,
  resendOTP,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  googleAuth,
} from "../../Controllers/Auth/auth.controller";
import validate from "../../Middlewares/reqValidation.middleware";

const router = Router();

router.post("/signUp", signUpValidationRules(), validate, signUp);
router.post("/google", googleAuth);
router.post(
  "/activateAccount",
  otpValidationRules(),
  validate,
  activateUserAccount
);
router.post("/validateOTP", otpRules(), validate, validateOTP);
router.post("/resendOTP", emailValidationRules(), validate, resendOTP);
router.post("/login", loginValidationRules(), validate, login);
router.get(
  "/refreshToken",
  refreshTokenValidationRules(),
  validate,
  refreshToken
);
router.post(
  "/forgotPassword",
  emailValidationRules(),
  validate,
  forgotPassword
);
router.post(
  "/resetPassword",
  resetPasswordValidationRules(),
  validate,
  resetPassword
);
export default router;
