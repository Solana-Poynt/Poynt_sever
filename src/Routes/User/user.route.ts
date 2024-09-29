import { Router } from "express";
import {
  reviewValidationRules,
  saveLocationValidationRules,
} from "../../Middlewares/User/user.middleware";

import { makeReview } from "../../Controllers/User/user.controller";
import validate from "../../Middlewares/reqValidation.middleware";

const router = Router();

router.post("/makeReview", reviewValidationRules(), validate, makeReview);

export default router;
