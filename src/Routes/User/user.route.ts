import { Router } from "express";
import {
  reviewValidationRules,
  saveLocationValidationRules,
  fundPoyntValidationRules,
  addEngagementValidationRules,
} from "../../Middlewares/User/user.middleware";

import {
  makeReview,
  getReviews,
  getUser,
  fundPoynt,
  addEngagement,
  addTasksDone,
} from "../../Controllers/User/user.controller";
import validate from "../../Middlewares/reqValidation.middleware";
import authenticate from "../../Middlewares/verifyToken.middleware";

const router = Router();

router.get("/", validate, authenticate, getUser);
router.patch(
  "/fundPoynt",
  fundPoyntValidationRules(),
  validate,
  authenticate,
  fundPoynt
);
router.patch(
  "/addEngagement",
  addEngagementValidationRules(),
  validate,
  authenticate,
  addEngagement
);
router.patch("/addTasksDone", validate, authenticate, addTasksDone);
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
