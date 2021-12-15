import express, { Request, Response } from "express";
const router = express.Router();

// SWAGGER
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../config/swagger/swaggerOptions';

import tasksRouter from "./tasks.routes";

router.get("/", (req: Request, res: Response) => {
  res.send("Server Challenge - Tasks Admin API - Gabriel Cancellieri");
});

router.use("/tasks", tasksRouter); //Router for resource Task

const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.get("*", function (req: Request, res: Response) {
  res.status(404).send("Page not found");
});

export default router;