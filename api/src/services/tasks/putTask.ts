import { BasicError } from "../../utils/basicError";
import { insertOne } from "../../repositories/tasks";
import { Task } from "../../interfaces/Task";

/**
 * Create a new log entry for a task
 * @param {Task} [id] - Id of the task to change
 * @returns {Task} - A task object
 * @throws Will throw an error if exists any problem trying to update the task
 *
 */
export async function putTask(task: Task) {
  try {
    const updatedTask = await insertOne(task);
    return updatedTask;
  } catch (error) {
    throw new BasicError("Internal Server Error", 500);
  }
}
