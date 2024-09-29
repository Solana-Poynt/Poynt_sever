import { Router } from "express";
import {
  reviewValidationRules,
  saveLocationValidationRules,
} from "../../Middlewares/User/user.middleware";

import {
  makeReview,
  getReviews,
  getUser,
} from "../../Controllers/User/user.controller";
import validate from "../../Middlewares/reqValidation.middleware";
import authenticate from "../../Middlewares/verifyToken.middleware";

const router = Router();

router.get("/:id", validate, authenticate, getUser);
router.post(
  "/makeReview",
  reviewValidationRules(),
  validate,
  authenticate,
  makeReview
);
router.get(
  "/getReview",
  saveLocationValidationRules(),
  validate,
  authenticate,
  getReviews
);

export default router;
