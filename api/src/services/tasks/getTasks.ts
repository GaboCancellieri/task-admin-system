import tasksTitleAPI from "../../utils/tasksTitleAPI";
import { BasicError } from "../../utils/basicError";
import * as crypto from "crypto";
import { environmentVariables } from "../../config/environment/environmentVariables";
import { Task } from "../../interfaces/Task";
/**
 * Generate new tasks from the database.
 * @returns {Promise<Task[]>} - Promises an array of strings
 * @throws Will throw an error if exists any problem trying to get the tasks.
 *
 */
async function getTasks(numberOfTasks: number): Promise<Task[]> {
  try {
    const titles = await fetchTitlesFromAPI(numberOfTasks);

    // Create an array of tasks from titles
    const tasks: Task[] = titles.map((title: string) => {
        return { id: crypto.randomUUID(), title };
    });

    return tasks;
  } catch (error) {
    if (error instanceof BasicError) {
      // In case the error is thrown by the fetchTitlesFromAPI function
      throw error;
    } else {
      throw new BasicError("Internal Server Error", 500);
    }
  }
};

/**
 * Function to get a list of titles the Lorem Faker API.
 * @returns {Promise<string[]>} - Promises an array of task titles
 * @throws Will throw an error in case there's a connection problem with Lorem Faker API
 */
 async function fetchTitlesFromAPI(numberOfTasks: number): Promise<string[]> {
  try {
    let response = await tasksTitleAPI.get('/api', { params: { quantity: numberOfTasks }});
    return response.data;
  } catch (error) {
    throw new BasicError("Error while calling the Lorem Faker API", 504);
  }
};

export default getTasks;