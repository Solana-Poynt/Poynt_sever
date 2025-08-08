import { Router } from "express";
import validate from "../../Middlewares/reqValidation.middleware";
import {
  createConcept,
  deleteConcept,
  getConcepts,
  getOneOrMultipleConcept,
  getOneOrMultipleQuestions,
  getOneOrMultipleTopics,
  repairGlobalIds,
  updateConcept,
} from "../../Controllers/Concepts/concept.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Concept
 *   description: Concept-related endpoints
 */

/**
 * @swagger
 * /api/v1/concept/multiple:
 *   post:
 *     summary: Get one or multiple concepts by IDs
 *     tags: [Concept]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [4, 5]
 *     responses:
 *       200:
 *         description: Successfully retrieved concept(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Concept'
 *       404:
 *         description: Concept(s) not found
 *       500:
 *         description: Internal server error
 */
router.post("/multiple", validate, getOneOrMultipleConcept);

/**
 * @swagger
 * /api/v1/concept/topic:
 *   post:
 *     summary: Get one or multiple topics by IDs
 *     tags: [Concept]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [4, 5]
 *     responses:
 *       200:
 *         description: Successfully retrieved concept(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Concept'
 *       404:
 *         description: Concept(s) not found
 *       500:
 *         description: Internal server error
 */
router.post("/topic", validate, getOneOrMultipleTopics);

/**
 * @swagger
 * /api/v1/concept/questions:
 *   post:
 *     summary: Get one or multiple questions by IDs
 *     tags: [Concept]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [4, 5]
 *     responses:
 *       200:
 *         description: Successfully retrieved concept(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Concept'
 *       404:
 *         description: Concept(s) not found
 *       500:
 *         description: Internal server error
 */
router.post("/questions", validate, getOneOrMultipleQuestions);

/**
 * @swagger
 * /api/v1/concept/all:
 *   get:
 *     summary: Fetch all Concepts
 *     tags: [Concept]
 *     responses:
 *       200:
 *         description: Successfully retrieved concepts
 */
router.get("/all", validate, getConcepts);

/**
 * @swagger
 * /api/v1/concept:
 *   post:
 *     summary: Create a new concept
 *     tags: [Concept]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Concept'
 *     responses:
 *       201:
 *         description: Concept created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Concept'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", createConcept);

/**
 * @swagger
 * /api/v1/concept/{id}:
 *   put:
 *     summary: Update a concept by ID
 *     tags: [Concept]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Concept ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Concept'
 *     responses:
 *       200:
 *         description: Concept updated successfully
 *       404:
 *         description: Concept not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateConcept);

/**
 * @swagger
 * /api/v1/concept/{id}:
 *   delete:
 *     summary: Delete a concept by ID
 *     tags: [Concept]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Concept ID
 *     responses:
 *       200:
 *         description: Concept deleted successfully
 *       404:
 *         description: Concept not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteConcept);

/**
 * @swagger
 * /api/v1/concept/repair:
 *   get:
 *     summary: Repair Global Ids
 *     tags: [Concept]
 *     responses:
 *       200:
 *         description: Ids repaired successfully
 *       500:
 *         description: Server error
 */
router.get("/repair", repairGlobalIds);

export default router;
