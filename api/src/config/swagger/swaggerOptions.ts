import definitions from './swagger.json';

export const swaggerOptions = {
    explorer: true,
    swaggerDefinition: {
      servers: [
        {
          url: `http://${process.env.API_HOST}:${process.env.API_PORT}/api`,
          description: 'Development Server',
        },
      ],
      info: {
        title: 'Task Admin API',
        version: '1.0.0',
        description: 'This is the Task Admin API information.',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
      definitions,
    },
    apis: ['./**/*.routes.js'],
  };