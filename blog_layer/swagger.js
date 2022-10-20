const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const doc = {
info: {
title: "My API",
description: "Description",
},
host: process.env.IPADD,
schemes: ["http"],
securityDefinitions: {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    in: 'header',
    bearerFormat: 'JWT',
  },
},
};

const outputFile = "./swagger-output.js";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);