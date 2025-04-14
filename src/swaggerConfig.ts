import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://poynt-sever.onrender.com"
    : "http://localhost:5000";

const fileExtension = process.env.NODE_ENV === "production" ? "js" : "ts";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "POYNT Server API",
      version: "1.0.0",
      description: "API documentation for POYNT server",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
  },
  apis: [
    path.join(__dirname, `./Routes/**/*.${fileExtension}`),
    path.join(__dirname, `./swagger/**/*.${fileExtension}`),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
