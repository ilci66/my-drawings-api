const express = require("express");
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const bodyParser = require('body-parser');
// I don't have any routes yet though
const routes = require('./routes/index.js')
const app = express();



// change it later
app.use(cors());
app.use(helmet());

app.use(bodyParser.json({}))
// app.use(bodyParser.urlencoded({}))

app.use('/', routes)

const { BACKEND_PORT, NODE_ENV } = process.env;

console.log(BACKEND_PORT, NODE_ENV)

let port = BACKEND_PORT || 3003;

const isProduction = NODE_ENV === 'production';

app.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Internal server error',
    error: isProduction ? null : err,
  }),
);

app.listen(port, () => console.log(`app is listening on port: ${port}`))
