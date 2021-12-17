import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { handleErrors } from './middleware/errorHandler';
import MongoConnection from "./db/mongoConnection";
import * as dotenv from "dotenv";
dotenv.config();

import { environmentVariables } from './config/environment/environmentVariables';

// CORS OPTIONS
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS || `http://${process.env.API_HOST}:${process.env.API_PORT}`,
    optionsSuccessStatus: 200, // For legacy browser support
};

// IMPORT ROUTES
import apiRoutes from "./routes/index";

class Server {
    app: express.Application;
  
    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 3666);
        this.config();
        this.routes();
    }
  
    config() {
        /* middleware initialziation */
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(handleErrors);
    }
  
    routes(){
        /* use api routes */
        this.app.use('/api', apiRoutes);
    }
  
    start() {
      return this.app.listen(this.app.get('port'), () => {
        this.connectToMongo();
      });
    }

    connectToMongo() {
        //Creating the DB when the server starts.
        try {
            MongoConnection.connectToMongo();
            console.log(`Tasks API listening at http://${environmentVariables.apiHost}:${environmentVariables.apiPort}`);
        } catch (error) {
            console.error(error);
            throw new Error("Cannot connect with the database");
        }
    }
}
  

const server = new Server();
export default server.start();