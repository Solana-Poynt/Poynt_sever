/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - confirmPassword
 *         - email
 *       properties:
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *         email:
 *           type: string
 *         referralId:
 *           type: string
 *           nullable: true
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     OTP:
 *       type: object
 *       required:
 *         - OTP
 *         - email
 *       properties:
 *         OTP:
 *           type: string
 *         email:
 *           type: string
 *     Email:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *     ResetPassword:
 *       type: object
 *       required:
 *         - newPassword
 *         - confirmPassword
 *         - email
 *         - OTP
 *       properties:
 *         newPassword:
 *           type: string
 *         confirmPassword:
 *           type: string
 *         email:
 *           type: string
 *         OTP:
 *           type: string
 *     GoogleAuth:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *           example: John Doe
 *         idToken:
 *           type: string
 *           description: The Google ID token for authentication.
 *           example: abc123xyz
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: johndoe@example.com
 *         role:
 *           type: string
 *           description: The user's role (optional).
 *           example: admin
 *     RefreshTokenRequest:
 *       type: object
 *       properties:
 *         x-user-email:
 *           type: string
 *           description: The email address of the user for whom the token is being refreshed.
 *           example: johndoe@example.com
 *         x-user-token:
 *           type: string
 *           description: The refresh token for the user.
 *           example: abc123xyz456
 */
