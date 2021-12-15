import { Task } from "../interfaces/Task";

import MongoConnection from "../db/mongoConnection";
import { BasicError } from "../utils/basicError";

const getTasksCollection = () => {
  let collectionTasks;
  if (MongoConnection.db) {
    collectionTasks = MongoConnection.db.collection("tasks");
  }
  return collectionTasks;
};

/**
 * Find all tasks from the DB
 * @returns {Task[]} - A array of tasks
 * @throws Will throw an error if any problem ocurres with the DB
 *
 */
export async function findAll() {
  try {
    let result;
    const collectionTasks = getTasksCollection();
    if (collectionTasks) {
      const allTasks = await collectionTasks.find().toArray();
      result = allTasks;
    }
    return result;
  } catch (error) {
      console.error("Error in findAll tasks from DB");
      console.error(error);
      throw new BasicError("Internal Server Error", 500);
  }
}

/**
 * Insert a Task in the DB
 * @param {Task} [task] - A task object
 * @returns {Task} - a task object
 * @throws Will throw an error if any problem ocurres with the DB
 *
 */
 export async function insertOne(task: Task) {
  try {
    const collectionTasks = getTasksCollection();
    if (collectionTasks) {
      const insertResult = await collectionTasks.insertOne(task);
      console.log(insertResult);
      // const taskNewObject = insertResult.ops[0];
      return task;
    }
  } catch (error) {
    console.error("Error when insert a task to the DB");
    console.error(error);
    throw new BasicError("Internal Server Error", 500);
  }
}
