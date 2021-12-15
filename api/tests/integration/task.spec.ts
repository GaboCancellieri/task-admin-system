//We first config a couple of envs to be loaded by mocha and passed to the app
process.env.NODE_ENV = "test";
process.env.LOREM_FAKER_API_URL = "https://lorem-faker.vercel.app";

import MongoConnection from "../../src/db/mongoConnection";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/server";
import { expect } from "chai";
import * as crypto from 'crypto';
chai.use(chaiHttp);

let mockTask = {"id":"2d86af12-c6df-47a4-b451-17791facaa12", "title":"sed beatae doloremque", "isComplete": false}

describe("Tasks [Integration Testing]", () => {
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

  describe("/GET tasks", () => {
    it("it should GET a array of three tasks by default", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a("array");
          expect(res.body.length).be.equal(3);
          done();
        });
    });
    it("it should GET a array of 500 tasks", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .query({ quantity: 500 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).be.a("array");
          expect(res.body.length).be.equal(500);
          done();
        });
    });
    it("it should GET an error exceeding the request limit", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .query({ quantity: 1001 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it("it should GET an error due to a string input for quantity", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .query({ quantity: "asdasd" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("/PUT tasks", () => {
    it("it should PUT a new completed task", (done) => {
      const taskTitle = "An updated task"
      chai
        .request(server)
        .put(`/api/tasks/${mockTask.id}`)
        .send({ title: taskTitle, isComplete: true })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.id).be.equal(mockTask.id);
          expect(res.body.title).be.equal(taskTitle);
          expect(res.body.isComplete).be.equal(true);
          done();
        });
    });
    it("it should not PUT a new completed task, title is undefined", (done) => {
      const taskId = crypto.randomUUID();
      chai
        .request(server)
        .put(`/api/tasks/${taskId}`)
        .send({ title: undefined })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
