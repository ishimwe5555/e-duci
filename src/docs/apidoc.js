const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Library',
      version: 1.0,
      description: 'Team Sostene API documentation',
    },
    servers: [
      {
        url: '/',
        description: 'Api server',
      },
    ],
    schemes: ['HTTP', 'HTTPS'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/docs/*'],
};

export default options;
