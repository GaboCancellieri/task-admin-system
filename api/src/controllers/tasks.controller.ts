import getTasks from "../services/tasks/getTasks";
import { NextFunction, Request, Response } from "express";
import { BasicError } from "../utils/basicError";

export async function getTasksController (req: Request, res: Response, next: NextFunction) {
  const { quantity } = req.query;
  const numberOfTasks = (!quantity) ? 3 : Number(quantity.toString())
  try {
    if(!isNaN(numberOfTasks)) {
      if (numberOfTasks > 1000) {
        throw new BasicError("Can't generate more than 1000 tasks", 400);
      }
      const tasks = await getTasks(numberOfTasks);
      if (tasks) {
        res.status(200).json(tasks);
      } else {
        throw new BasicError("An error ocurred while generating tasks", 400);
      }
    } else {
      throw new BasicError(`${quantity} is not a number.`, 400);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export async function putTasksController (req: Request, res: Response, next: NextFunction) {

};
