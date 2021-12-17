# Task Admin System
A small system which helps you to manage and generate tasks. 

# Table of Contents
1. [Technologies](#technologies)
2. [Setup APP](#setupAPP)
3. [Setup API](#setupAPI)
4. [Dockerize APP](#dockerizeAPP)
4. [Dockerize API](#dockerizeAPI)
5. [Documentation](#documentation)

## Technologies
### APP
The system's frontend is build up with the following technologies:
* React: 17.0.2
* [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap): 2.0.3
* [Typescript](https://github.com/Microsoft/TypeScript): 4.5.4

### API
The system's backend is build up with the following technologies:
* NodeJS: 16.13.1
* [ExpressJS](https://github.com/expressjs/express): 4.16.4
* [Cors](https://github.com/expressjs/cors): 2.8.5
* [MongoDB](https://github.com/mongodb/node-mongodb-native): 3.6.3
* [Axios](https://github.com/axios/axios): 0.24.0
* [DotEnv](https://github.com/motdotla/dotenv): 10.0.0
* [Morgan](https://github.com/expressjs/morgan): 1.10.0
* [Helmet](https://github.com/helmetjs/helmet): 4.6.0
* [Compression](https://github.com/expressjs/compression): 1.7.4
* [Typescript](https://github.com/Microsoft/TypeScript): 3.3.3


## Setup APP
Follow the next steps to run the system's app in your local enviroment:

### Prerequisites
You need to have installed the NodeJS Version 16.13.1. You can easily install it with nvm.

```bash
nvm install 16.13.1
```

Then, you need to set as the active version of node:

```bash
nvm use 16.13.1
```

### Clone the repository

```bash
git clone https://github.com/GaboCancellieri/task-admin-system.git
```

### Install dependencies

```bash
cd task-admin-system
npm install
```

### Start the app in local machine
You can run the app with the following command:

```bash
npm start
```

## Setup API
Follow the next steps to run the system's app in your local enviroment:

### Prerequisites
You need to have installed the NodeJS Version 16.13.1. You can easily install it with nvm.

```bash
nvm install 16.13.1
```

Then, you need to set as the active version of node:

```bash
nvm use 16.13.1
```

### Install dependencies

```bash
cd task-admin-system
npm install
```

### Transpile TypeScript into JavaScript 

```bash
npm run build
```

### Information about the .env
It is not recommended to have the .env file committed in the repository. In this case, it was done in that way just to make it easier to clone and test the server.

Information in the ENV:
```
API_PORT=3666  --> The port where the api will run. 3666 as default.
API_HOST=localhost  --> The host where the api will run. localhost as default.
DB_URL=localhost  --> MongoDB URL. localhost as default.
DB_PORT=27017  --> MongoDB Port. 27017 as default.
DB_NAME=tasks  --> The name  of the DB. 'tasks' as default.

LOREM_FAKER_API_URL=https://lorem-faker.vercel.app  --> The Lorem Faker API URL to fetch the title of the tasks.

ALLOWED_ORIGINS ==> The URL of the Client APP to set CORS Options. 'http://localhost:3000' as default.

MONGO_CONTAINER_NAME ==> The name of the mongo container for connect in 'production'. 'mongo' as default.
```

### Start the api in local machine
You can run the api with the following command:

```bash
npm start
```

### Testing

The project has a few test cases for the API endpoints. They are located in the `test/` folder.

The test cases was made with [Jest](https://github.com/facebook/jest) and [Chai](https://github.com/chaijs/chai). Also i used [Chai-http](https://github.com/chaijs/chai-http) to test the API.

To run the test run the next command:

```bash
npm run test
```

It will call `Jest` with a 30000ms of timeout.

**Important:** The test suite will create a new database in the same connection, but with another name (`tasks_test`).

## Dockerize APP
The system's app is ready to run in docker containers. Follow the steps ahead to dockerize the app:

### Build the container:

```bash
docker-compose build
```

### Run the container:

```bash
docker-compose up -d
```

### Stop container:

```bash
docker-compose down
```

## Dockerize API
The system's api is ready to run in docker containers. In this case, we need a container for the node server and another for the mongodb. So i created a docker-compose file to create and run both:

### Build the containers:

```bash
docker-compose build
```

### Run the containers:

```bash
docker-compose up -d
```

### If you want to stop both containers at the same time:

```bash
docker-compose down
```

**Important:** To make the nodejs container wait until the mongodb container is up **and ready** i used a sh script called [wait-for-it.sh](https://github.com/vishnubob/wait-for-it).

## Documentation

In this section, i will describe the available endpoints:

### Tasks Admin API

#### Endpoint

`GET /tasks/`

To get a list of tasks. By default it gets three tasks. This endpoint will first try to get the tasks from the db. In case there are tasks missing it will call the Lorem Faker API to fetch new task titles and will save the missing amount of tasks into the DB before returning the array of tasks.

#### Parameters
    * (OPTIONAL) quantity - "number" - the number of tasks generated or retrived from the API

#### Response

**Status 200:** An array of task objects:

    [{
        "_id": "string",
        "id": "string",
        "title": "string",
        "isComplete": boolean,
    }]

**Status 504:** A error object. This happens when the Lorem Faker API is down or busy.

#### Endpoint

`PUT /tasks/:id`

It will update the whole object with the new properties given.


#### Parameters
    * id - "string" - the task's id.
    * title - "string" - the task's title.
    * isComplete - "boolean" - the task's state of completion.

#### Response

**Status 200:** A task object:

    {
        "_id": "string",
        "id": "string",
        "title": "string",
        "isComplete": boolean,
    }
