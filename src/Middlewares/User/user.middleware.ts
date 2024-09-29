import { Response, NextFunction } from "express";
import { body, check } from "express-validator";

export const reviewValidationRules = () => {
  return [
    body("locationReviewed")
      .trim()
      .notEmpty()
      .withMessage("Location Reviewed can not be empty"),
    body("rating").trim().notEmpty().withMessage("rating can not be empty"),
    body("reviewMessage")
      .trim()
      .notEmpty()
      .withMessage("Review Message can not be empty"),
    body("reviewer").trim().notEmpty().withMessage("Reviewer can not be empty"),
  ];
};

export const saveLocationValidationRules = () => {
  return [
    body("location").trim().notEmpty().withMessage("Location can not be empty"),
  ];
};
