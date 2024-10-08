import { Response, NextFunction } from "express";
import { body, check } from "express-validator";

export const signUpValidationRules = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name can not be empty"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage(
        "Password must be between min of 6 and max of 16 characters"
      ),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("Confirm Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage(
        "Password must be between min of 6 and max of 16 characters"
      ),
    body("email").trim().isEmail().withMessage("please enter a valid Email"),
    body("referralId")
      .trim()
      .optional()
      .notEmpty()
      .withMessage("Referral can not be empty"),
  ];
};

export const otpValidationRules = () => {
  return [
    body("OTP")
      .trim()
      .isLength({ min: 4, max: 4 })
      .withMessage("OTP code must be 4 digit long"),
    body("email").trim().isEmail().withMessage("please enter a valid email"),
  ];
};

export const otpRules = () => {
  return [
    body("OTP")
      .trim()
      .isLength({ min: 4, max: 4 })
      .withMessage("OTP code must be 4 digit long"),
  ];
};

export const emailValidationRules = () => {
  return [
    body("email").trim().isEmail().withMessage("please enter a valid email"),
  ];
};

export const loginValidationRules = () => {
  return [
    body("email").trim().isEmail().withMessage("please enter a valid email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage(
        "Password must be between min of 6 and max of 16 characters"
      ),
  ];
};

export const refreshTokenValidationRules = () => {
  return [
    check("x-user-email").notEmpty().withMessage("Email header is required"),
    check("x-user-token")
      .notEmpty()
      .withMessage("Refresh Token header is required"),
  ];
};

export const resetPasswordValidationRules = () => {
  return [
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password must be between 6 and 16 characters"),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password must be between 6 and 16 characters"),
    body("email").trim().isEmail().withMessage("please enter a valid email"),
    body("OTP")
      .trim()
      .isNumeric()
      .isLength({ min: 4, max: 4 })
      .withMessage("OTP must be at least 4 character long"),
  ];
};
