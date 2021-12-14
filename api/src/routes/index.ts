import express, { Request, Response } from "express";
const router = express.Router();

import tasksRouter from "./tasks.routes";

router.get("/", (req: Request, res: Response) => {
  res.send("Server Challenge - Tasks Admin API - Gabriel Cancellieri");
});

router.use("/tasks", tasksRouter); //Router for resource Task

router.get("*", function (req: Request, res: Response) {
  res.status(404).send("Page not found");
});

export default router;