const express = require("express");
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
// I don't have any routes yet though
// const router = require('./routes');

const app = express();



// change it later
app.use(cors());
app.use(helmet());


// app.use(router)

const { BACKEND_PORT, NODE_ENV } = process.env;

console.log(BACKEND_PORT, NODE_ENV)

port = BACKEND_PORT || 3003;

const isProduction = NODE_ENV === 'production';

app.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Internal server error',
    error: isProduction ? null : err,
  }),
);

app.listen(port, () => console.log(`app is listening on port: ${port}`))
