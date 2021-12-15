import getTasks from "../services/tasks/getTasks";
import { NextFunction, Request, Response } from "express";
import { BasicError } from "../utils/basicError";
import { putTask } from "../services/tasks/putTask";

export async function getTasksController (req: Request, res: Response, next: NextFunction) {
  const { quantity } = req.query;
  const numberOfTasks = (!quantity) ? 3 : Number(quantity.toString())
  try {
    if(!isNaN(numberOfTasks)) {
      if (numberOfTasks > 1000) {
        throw new BasicError("Can't get more than 1000 tasks", 400);
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
}

export async function putTasksController (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { title, isComplete } = req.body;
  try {
    if(title && isComplete && Object.keys(req.body).length === 2) {
      const taskToUpdate = {
        id,
        title,
        isComplete
      }
      const updatedTask = await putTask(taskToUpdate);
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        throw new BasicError("An error ocurred while updating task", 400);
      }
    } else {
      throw new BasicError("Bad Request", 400);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}
