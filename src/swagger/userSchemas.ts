/**
 * @swagger
 * components:
 *   schemas:
 *     MakeReview:
 *       type: object
 *       required:
 *         - locationReviewed
 *         - rating
 *         - reviewMessage
 *         - reviewer
 *       properties:
 *         locationReviewed:
 *           type: string
 *         rating:
 *           type: number
 *         reviewMessage:
 *           type: string
 *         reviewer:
 *           type: string
 *
 *     FundPoynt:
 *       type: object
 *       required:
 *         - userId
 *         - poyntValue
 *       properties:
 *         userId:
 *           type: string
 *         poyntValue:
 *           type: number
 *
 *     AddEngagement:
 *       type: object
 *       required:
 *         - campaignId
 *       properties:
 *         campaignId:
 *           type: string
 *
 *     SaveLocation:
 *       type: object
 *       required:
 *         - location
 *       properties:
 *         location:
 *           type: string
 */
