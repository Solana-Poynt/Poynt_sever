import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://poynt-sever.onrender.com"
    : "http://localhost:5000";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "POYNT Server API",
      version: "1.0.0",
      description: "API documentation for POYNT server",
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
  },
  apis: ["./Routes/**/*.ts", "./Controllers/**/*.ts", "./Models/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
