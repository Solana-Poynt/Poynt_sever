/**
 * @swagger
 * components:
 *   schemas:
 *     Concept:
 *       type: object
 *       required:
 *         - concept_id
 *         - title
 *         - description
 *         - topics
 *       properties:
 *         concept_id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Computer Systems Fundamentals
 *         description:
 *           type: string
 *           example: How computers actually work - from bits to programs
 *         topics:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Topic'
 *
 *     Topic:
 *       type: object
 *       required:
 *         - topic_id
 *         - title
 *         - learning_content
 *         - questions
 *       properties:
 *         topic_id:
 *           type: integer
 *         title:
 *           type: string
 *         learning_content:
 *           $ref: '#/components/schemas/LearningContent'
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *
 *     LearningContent:
 *       type: object
 *       required:
 *         - summary
 *         - big_note
 *         - battle_relevance
 *       properties:
 *         summary:
 *           type: string
 *         big_note:
 *           type: array
 *           items:
 *             type: string
 *         battle_relevance:
 *           type: string
 *
 *     Question:
 *       type: object
 *       required:
 *         - question_id
 *         - text
 *         - correct
 *         - explanation
 *       properties:
 *         question_id:
 *           type: integer
 *         text:
 *           type: string
 *         correct:
 *           type: boolean
 *         explanation:
 *           type: string
 */
