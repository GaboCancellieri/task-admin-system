import tasksTitleAPI from "../../utils/tasksTitleAPI";
import { BasicError } from "../../utils/basicError";
import * as crypto from "crypto";
import { Task } from "../../interfaces/Task";
import { findWithLimit, insertMany } from "../../repositories/tasks";
/**
 * Generate new tasks from the database.
 * @returns {Promise<Task[]>} - Promises an array of strings
 * @throws Will throw an error if exists any problem trying to get the tasks.
 *
 */
async function getTasks(numberOfTasks: number) {
  try {
    let tasksInDb = await findWithLimit(numberOfTasks);
    let result;
    if (tasksInDb && tasksInDb.length < numberOfTasks) {
      // We generate the missing amount of tasks to complete the number of tasks requested.
      const amountDiff = numberOfTasks - tasksInDb.length;
      const newTasks: Task[] = await generateNewTasks(amountDiff);

      // Save generated tasks in Db
      const savedTasks = await insertMany(newTasks);
      if (savedTasks) {
        result = tasksInDb.concat(savedTasks);
      } else {
        throw new BasicError("Error while saving tasks", 500);
      }
    } else if(tasksInDb && tasksInDb.length >= numberOfTasks) {
      result = tasksInDb;
    }
    return result;
  } catch (error) {
    if (error instanceof BasicError) {
      // In case the error is thrown by any of the called functions 
      throw error;
    } else {
      throw new BasicError("Internal Server Error", 500);
    }
  }
}

/**
 * Function to generate certain amount of tasks.
 * @returns {Promise<Task[]>} - Promises an array of tasks
 * @throws Will throw an error in case there's a problem with the task generation
 */
async function generateNewTasks(numberOfTasks: number) {
  const titles = await fetchTitlesFromAPI(numberOfTasks);

  // Create an array of tasks from titles
  const tasks: Task[] = titles.map((title: string) => {
      return { id: crypto.randomUUID(), title, isComplete: false };
  });

  return tasks;
}

/**
 * Function to get a list of titles the Lorem Faker API.
 * @returns {Promise<string[]>} - Promises an array of task titles
 * @throws Will throw an error in case there's a connection problem with Lorem Faker API
 */
 async function fetchTitlesFromAPI(numberOfTasks: number): Promise<string[]> {
  try {
    const response = await tasksTitleAPI.get('/api', { params: { quantity: numberOfTasks }});
    return response.data;
  } catch (error) {
    throw new BasicError("Error while calling the Lorem Faker API", 504);
  }
}

export default getTasks;