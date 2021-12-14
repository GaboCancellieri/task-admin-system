//We first config a couple of envs to be loaded by mocha and passed to the app
process.env.NODE_ENV = "test";
process.env.LOREM_FAKER_API_URL = "https://lorem-faker.vercel.app";

import MongoConnection from "../../src/db/mongoConnection";

import getTasks from "../../src/services/tasks/getTasks";
var expect = require("chai").expect;

describe("Tasks [Unit Testing]", () => {
  // clean the database (tasks collection)
  beforeEach(async () => {
    await MongoConnection.connectToMongo();
    if (MongoConnection.db) {
      const collectionTasks = MongoConnection.db.collection("tasks");
      await collectionTasks.deleteMany({});
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
    it("it should GET a array of three tasks", async () => {
      const tasks = await getTasks(3);
      expect(tasks).be.a("array");
      expect(tasks.length).be.equal(3);
    });
    it("it should GET a array of 500 tasks", async () => {
      const tasks = await getTasks(500);
      expect(tasks).be.a("array");
      expect(tasks.length).be.equal(500);
    });
  });
});
