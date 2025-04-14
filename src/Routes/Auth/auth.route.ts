import { Router } from "express";
import {
  signUpValidationRules,
  otpValidationRules,
  emailValidationRules,
  loginValidationRules,
  refreshTokenValidationRules,
  resetPasswordValidationRules,
  otpRules,
  googleAuthValidationRules,
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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth-related endpoints
 */

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/signUp", signUpValidationRules(), validate, signUp);

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Google Auth
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoogleAuth'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/google", googleAuthValidationRules(), validate, googleAuth);

/**
 * @swagger
 * /auth/activateAccount:
 *   post:
 *     summary: Activate user account using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OTP'
 *     responses:
 *       200:
 *         description: Account activated
 */
router.post(
  "/activateAccount",
  otpValidationRules(),
  validate,
  activateUserAccount
);

/**
 * @swagger
 * /auth/validateOTP:
 *   post:
 *     summary: Validate OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OTP'
 *     responses:
 *       200:
 *         description: OTP validated
 */
router.post("/validateOTP", otpRules(), validate, validateOTP);

/**
 * @swagger
 * /auth/resendOTP:
 *   post:
 *     summary: Resend OTP to user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: OTP resent
 */
router.post("/resendOTP", emailValidationRules(), validate, resendOTP);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginValidationRules(), validate, login);

/**
 * @swagger
 * /auth/refreshToken:
 *   get:
 *     summary: Refreshes the user authentication token
 *     tags: [Auth]
 *     description: Uses the provided refresh token and email to refresh the authentication token for the user.
 *     parameters:
 *       - in: header
 *         name: x-user-email
 *         required: true
 *         schema:
 *           type: string
 *           description: The email address of the user
 *       - in: header
 *         name: x-user-token
 *         required: true
 *         schema:
 *           type: string
 *           description: The refresh token for the user
 *     responses:
 *       200:
 *         description: Successfully refreshed the token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token refreshed successfully
 *                 newToken:
 *                   type: string
 *                   example: newAccessToken123
 *       400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing or invalid refresh token data
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
router.get(
  "/refreshToken",
  refreshTokenValidationRules(),
  validate,
  refreshToken
);

/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     summary: Trigger forgot password OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post(
  "/forgotPassword",
  emailValidationRules(),
  validate,
  forgotPassword
);

/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post(
  "/resetPassword",
  resetPasswordValidationRules(),
  validate,
  resetPassword
);
export default router;
