import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { handleErrors } from './middleware/errorHandler';

// SWAGGER IMPORTS
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger/swaggerOptions';

// CORS OPTIONS
var corsOptions = {
    origin: process.env.ALLOWED_ORIGINS || `http://${process.env.API_HOST}:${process.env.API_PORT}`,
    optionsSuccessStatus: 200, // For legacy browser support
};

// IMPORT ROUTES


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
        this.app.use(cors(corsOptions));
        this.app.use(handleErrors);
    }
  
    routes(){
        /* use api routes */
    }
  
    start() {
      this.app.listen(this.app.get('port'), () => {
        const swaggerDocs = swaggerJsDoc(swaggerOptions);
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
      });
    }
}
  

const server = new Server();
server.start();