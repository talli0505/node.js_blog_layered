const express = require('express')
const app = express()
const port = 3000
require("dotenv").config();
const cookieParser = require('cookie-parser');

const router = require('./routes')

app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json());
app.use(router)

// swagger
const swaggerFile = require('./swagger-output');
const swaggerUi = require('swagger-ui-express');

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true })
  );

app.get('/set', (req, res) => {
  res.cookie("name" , process.env.COOKIE_NAME)
});

app.get('/get', (req, res) => {
  res.send(req.cookies)
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!')
})