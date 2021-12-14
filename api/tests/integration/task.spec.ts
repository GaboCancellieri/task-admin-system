//We first config a couple of envs to be loaded by mocha and passed to the app
process.env.NODE_ENV = "test";
process.env.LOREM_FAKER_API_URL = "https://lorem-faker.vercel.app";

import MongoConnection from "../../src/db/mongoConnection";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/server";
var expect = require("chai").expect;

chai.use(chaiHttp);

describe("Tasks [Integration Testing]", () => {
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
});
