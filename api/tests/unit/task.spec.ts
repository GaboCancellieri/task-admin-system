//We first config a couple of envs to be loaded by mocha and passed to the app
process.env.NODE_ENV = "test";
process.env.LOREM_FAKER_API_URL = "https://lorem-faker.vercel.app";

import MongoConnection from "../../src/db/mongoConnection";

import getTasks from "../../src/services/tasks/getTasks";
import { expect } from 'chai';
import { putTask } from "../../src/services/tasks/putTask";

let mockTask = {"id":"2d86af12-c6df-47a4-b451-17791facaa12", "title":"sed beatae doloremque", "isComplete": false}

describe("Tasks [Unit Testing]", () => {
  // clean the database (tasks collection)
  beforeEach(async () => {
    await MongoConnection.connectToMongo();
    if (MongoConnection.db) {
      const collectionTasks = MongoConnection.db.collection("tasks");
      await collectionTasks.deleteMany({});
      await collectionTasks.insertOne(mockTask);
    }
  });

  // clean the database after tests.
  afterEach(async () => {
    await MongoConnection.connectToMongo();
    if (MongoConnection.db) {
      const collectionTasks = MongoConnection.db.collection("tasks");
      await collectionTasks.deleteMany({});
    }
  });

  describe("Get Tasks Service", () => {
    it("it should GET the same task -> idempotent", async () => {
      const tasks1 = await getTasks(1);
      const tasks2 = await getTasks(1);
      if (tasks1 && tasks2) {
        expect(tasks1[0].id).be.equal(tasks2[0].id);
        expect(tasks1[0].title).be.equal(tasks2[0].title);
        expect(tasks1[0].isComplete).be.equal(tasks2[0].isComplete);
      }
    });
    it("it should GET a array of three tasks", async () => {
      const tasks = await getTasks(3);
      if (tasks) {
        expect(tasks).be.a("array");
        expect(tasks.length).be.equal(3);
      }
    });
    it("it should GET a array of 500 tasks", async () => {
      const tasks = await getTasks(500);
      if (tasks) {
        expect(tasks).be.a("array");
        expect(tasks.length).be.equal(500);
      }
    });
  });

  describe("Put Tasks Service", () => {
    it("it should PUT a new completed task", async () => {
      const updateMocktask = {
        id: mockTask.id,
        title: 'A mock task',
        isComplete: true,
      }
      const updatedTask = await putTask(updateMocktask);
      expect(updatedTask).not.be.a("undefined");
      if (updatedTask) {
        expect(updatedTask.id).be.equal(updateMocktask.id);
        expect(updatedTask.title).be.equal(updateMocktask.title);
        expect(updatedTask.isComplete).be.equal(updateMocktask.isComplete);
      }
    });
  });
});
