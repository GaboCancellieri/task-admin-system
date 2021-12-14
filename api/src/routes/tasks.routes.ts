import express from "express";
import { getTasksController, putTasksController } from "../controllers/tasks.controller";

const tasksRouter = express.Router();

// GET in /tasks/
tasksRouter.get("/", getTasksController);

// PUT in /tasks/:id
tasksRouter.put("/:id", putTasksController);

export default tasksRouter;