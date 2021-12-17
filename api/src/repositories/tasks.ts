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
      console.error("Error while finding all tasks from DB");
      console.error(error);
      throw new BasicError("Internal Server Error", 500);
  }
}

/**
 * Find with a limited amount of tasks from the DB
 * @returns {Task[]} - A array of tasks
 * @throws Will throw an error if any problem ocurres with the DB
 *
 */
 export async function findWithLimit(limit: number): Promise<Task[]> {
  try {
    let result: any[] = [];
    const collectionTasks = getTasksCollection();
    if (collectionTasks) {
      result = await collectionTasks.find().limit(limit).toArray();
    }
    return result;
  } catch (error) {
      console.error("Error while finding some tasks from DB");
      console.error(error);
      throw new BasicError("Internal Server Error", 500);
  }
}

/**
 * Insert a Array of Tasks into the DB
 * @param {Task[]} [tasks] - Array of tasks
 * @returns {Task[]} - A array of tasks with _id
 * @throws Will throw an error if any problem ocurres with the DB
 *
 */
 export async function insertMany(tasks: Task[]): Promise<Task[] | undefined> {
  try {
    let result;
    const collectionTasks = getTasksCollection();
    if (collectionTasks) {
      const insertResult = await collectionTasks.insertMany(tasks);
      result = tasks;
    }
    return result;
  } catch (error) {
    console.error("Error while inserting the tasks to the DB");
    console.error(error);
    throw new BasicError("Internal Server Error", 500);
  }
};

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
      await collectionTasks.insertOne(task);
      return task;
    }
  } catch (error) {
    console.error("Error when insert a task to the DB");
    console.error(error);
    throw new BasicError("Internal Server Error", 500);
  }
}

/**
 * Find a task and update it
 * @param {object} [filters] - The filters for the find
 * @param {Task} [newTask] - The object that will replace the current task
 * @returns {Task} - The new task object
 * @throws Will throw an error if any problem ocurres with the DB
 *
 */
 export async function findOneAndUpdate(filters: { id: string }, newTask: Task) {
  try {
    const collectionTasks = getTasksCollection();
    if (collectionTasks) {
      const result = await collectionTasks.findOneAndUpdate(
        filters,
        {
          $set: newTask,
        },
        { returnDocument: 'after' } // return the updated object
      );
  
      const { value: updatedTask } = result; // If its updated, returns the new object. If there no exist the target, returns null
      return updatedTask;
    }
  } catch (error) {
    console.error("Error in the findOneAndUpdate of tasks repository");
    console.error(error);
    throw new BasicError("Internal Server Error", 500);
  }
}
