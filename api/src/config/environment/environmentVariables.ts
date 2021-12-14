const {
  NODE_ENV,
  API_HOST,
  API_PORT,
  DB_URL,
  DB_PORT,
  DB_NAME,
  ALLOWED_ORIGINS,
  LOREM_FAKER_API_URL,
  MONGO_CONTAINER_NAME,
} = process.env;

export const environmentVariables = {
  enviroment: NODE_ENV || "development",
  apiHost: API_HOST || "localhost",
  apiPort: API_PORT || 3666,
  dbUrl: DB_URL || "localhost",
  dbPort: DB_PORT || 27017,
  dbName: DB_NAME || "tasks",
  allowedOrigins: ALLOWED_ORIGINS || "http://localhost:3666",
  loremFakerAPI: LOREM_FAKER_API_URL,
  mongoContainerName: MONGO_CONTAINER_NAME || "mongo",
};
