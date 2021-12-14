import { Db, MongoClient, MongoClientOptions } from "mongodb";
import { environmentVariables } from "../config/environment/environmentVariables";

class MongoConnection {
  static db: Db | null;
  static dbName: string;
  static url: string;
  static options: MongoClientOptions;

  static async connectToMongo(): Promise<Db | null> {
    let result = this.db;
    if (!this.db) {
      // If there's no DB connection, we make a new connection
      try {
        const client = await MongoClient.connect(this.url, this.options);
        const db = client.db(this.dbName);
        this.db = db;
  
        //Check if the tasks collections is created
        this.db.listCollections({ name: "tasks" })
          .next(async function (err: any, collinfo: any) {
            if (err) {
              throw new Error(
                "Error when trying to list the collection tasks of the DB"
              );
            }
            if (collinfo) {
              // The collection exists
              console.log("The collection tasks already exists");
            } else {
              console.log("Creating the collection tasks...");
              await db.createCollection("tasks");
            }
          });
          result = this.db;
      } catch (error) {
        console.error(error);
        throw new Error("Error when trying to connect with DB");
      }
    }
    return result;
  }
}

MongoConnection.db = null;

//If we are in develop, we use localhost. In production, we target the mongo container
MongoConnection.url = `mongodb://
${environmentVariables.enviroment === "production" ? environmentVariables.mongoContainerName : environmentVariables.dbUrl}:
${environmentVariables.dbPort}`; 

// Change database name to test
MongoConnection.dbName = environmentVariables.enviroment === "test" ? "tasks_test" : environmentVariables.dbName; 

export default MongoConnection;
