import { Router } from "express";
import validate from "../../Middlewares/reqValidation.middleware";
import {
  createConcept,
  deleteConcept,
  getConcepts,
  getOneConcept,
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
 * /api/v1/concept:
 *   get:
 *     summary: Fetch all Concepts
 *     tags: [Concept]
 *     responses:
 *       200:
 *         description: Successfully retrieved concepts
 */
router.get("/", validate, getConcepts);

/**
 * @swagger
 * /api/v1/concept/{id}:
 *   get:
 *     summary: Get one concept by ID
 *     tags: [Concept]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The concept ID
 *     responses:
 *       200:
 *         description: Successfully retrieved one concept
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Concept'
 *       404:
 *         description: Concept not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", validate, getOneConcept);

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

export default router;
