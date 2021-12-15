import { BasicError } from "../../utils/basicError";
import { findOneAndUpdate, insertOne } from "../../repositories/tasks";
import { Task } from "../../interfaces/Task";

/**
 * Update a task to completed
 * @param {Task} [id] - Id of the task to change
 * @returns {Task} - A task object
 * @throws Will throw an error if exists any problem trying to update the task
 *
 */
export async function putTask(task: Task) {
  try {
    const updatedTask = await findOneAndUpdate(
      { id: task.id }, // Filter
      task  // Task object to update
    );
    return updatedTask;
  } catch (error) {
    throw new BasicError("Internal Server Error", 500);
  }
}
