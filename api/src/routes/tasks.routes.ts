import express from "express";
import { getTasksController, putTasksController } from "../controllers/tasks.controller";

const tasksRouter = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve a list of generated tasks
 *     tags:
 *       - tasks
 *     description: Retrieve a list of generated tasks. All the invocations to this endpoint will return a different list.
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Quantity of tasks to generate.
 *         type: integer
 *         minimum: 0
 *         maximum: 1000
 *     responses:
 *       '200':
 *         description: A list of tasks
 *         schema:
 *           $ref: '#/definitions/Task'
 *       '400':
 *         description: Can't generate more than 1000 tasks
 *         schema:
 *           $ref: '#/definitions/Error'
 */
tasksRouter.get("/", getTasksController);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Create a new completed task
 *     tags:
 *       - tasks
 *     description: Create a new completed task. This endpoint will return the created task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of task to create.
 *         type: string
 *       - in: body
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of tasks
 *         schema:
 *           $ref: '#/definitions/Task'
 *       '400':
 *         description: An error ocurred while completing task
 *         schema:
 *           $ref: '#/definitions/Error'
 */
tasksRouter.put("/:id", putTasksController);

export default tasksRouter;