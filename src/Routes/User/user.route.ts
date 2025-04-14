import { Router } from "express";
import {
  reviewValidationRules,
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

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User-related endpoints
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get current user info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user info
 */
router.get("/", validate, authenticate, getUser);

/**
 * @swagger
 * /user/fundPoynt:
 *   patch:
 *     summary: Fund Poynt account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FundPoynt'
 *     responses:
 *       200:
 *         description: Poynt funded successfully
 */
router.patch(
  "/fundPoynt",
  fundPoyntValidationRules(),
  validate,
  authenticate,
  fundPoynt
);

/**
 * @swagger
 * /user/addEngagement:
 *   patch:
 *     summary: Add user engagement
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddEngagement'
 *     responses:
 *       200:
 *         description: Engagement added
 */
router.patch(
  "/addEngagement",
  addEngagementValidationRules(),
  validate,
  authenticate,
  addEngagement
);

/**
 * @swagger
 * /user/addTasksDone:
 *   patch:
 *     summary: Record completed tasks
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks marked as done
 */
router.patch("/addTasksDone", validate, authenticate, addTasksDone);

/**
 * @swagger
 * /user/makeReview:
 *   post:
 *     summary: Submit a user review
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MakeReview'
 *     responses:
 *       201:
 *         description: Review created
 */
router.post(
  "/makeReview",
  reviewValidationRules(),
  validate,
  authenticate,
  makeReview
);

/**
 * @swagger
 * /user/getReview:
 *   get:
 *     summary: Fetch user reviews
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user reviews
 */
router.get("/getReview", validate, authenticate, getReviews);

export default router;
