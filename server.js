/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

// * Importing packages
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');

// * Importing environment variable
require('dotenv').config();

let HOST;
let PORT;
let DB_USERNAME;
let DB_PASSWORD;
let DB_DATABASE_AUTH;
let DB_DATABASE;
let DB_HOST;
let DB_PORT;
if (process.env.NODE_ENV === 'development') {
  HOST = process.env.DEV_APP_HOST;
  PORT = process.env.DEV_APP_PORT;
  DB_USERNAME = process.env.DEV_DB_USERNAME;
  DB_PASSWORD = process.env.DEV_DB_PASSWORD;
  DB_DATABASE_AUTH = process.env.DEV_DB_DATABASE_AUTH;
  DB_DATABASE = process.env.DEV_DB_DATABASE;
  DB_HOST = process.env.DEV_DB_HOST;
  DB_PORT = process.env.DEV_DB_PORT;
}
if (process.env.NODE_ENV === 'test') {
  HOST = process.env.TEST_APP_HOST;
  PORT = process.env.TEST_APP_PORT;
  DB_USERNAME = process.env.TEST_DB_USERNAME;
  DB_PASSWORD = process.env.TEST_DB_PASSWORD;
  DB_DATABASE_AUTH = process.env.TEST_DB_DATABASE_AUTH;
  DB_DATABASE = process.env.TEST_DB_DATABASE;
  DB_HOST = process.env.TEST_DB_HOST;
  DB_PORT = process.env.TEST_DB_PORT;
}
if (process.env.NODE_ENV === 'production') {
  HOST = process.env.PROD_APP_HOST;
  PORT = process.env.PROD_APP_PORT;
  DB_USERNAME = process.env.PROD_DB_USERNAME;
  DB_PASSWORD = process.env.PROD_DB_PASSWORD;
  DB_DATABASE_AUTH = process.env.PROD_DB_DATABASE_AUTH;
  DB_DATABASE = process.env.PROD_DB_DATABASE;
  DB_HOST = process.env.PROD_DB_HOST;
  DB_PORT = process.env.PROD_DB_PORT;
}

// * Importing routers
const userRoute = require('./routes/user');
const scorecardRoute = require('./routes/scorecard');
const documentsRoute = require('./routes/document');
const scoreDictionaryRoute = require('./routes/scoreDictionary');
const scale = require('./routes/scale');
// * importing controllers
const errorController = require('./controllers/error');

// * Initializing express app
const app = express();

// * Helmet to protect against well known vulnerabilities by setting appropriate HTTP headers
app.use(helmet());

// * getting real source IP address
app.set('trust proxy', true);

// * Logging middleware
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// * CORS headers setter
app.use(cors());

// * Compress all routes
app.use(compression());

// * Make images folder publicly accessible
app.use('/documents', express.static(path.join(__dirname, 'documents')));

// * express body-parser settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * scoreDictionary Route
app.use(scoreDictionaryRoute);

// * user Route
app.use(userRoute);

// * scorecard Route
app.use(scorecardRoute);

//* scale Route
app.use(scale);

// * document Route
app.use(documentsRoute);

// * Error Route
app.use(errorController.get404);

// * Initialize mongoose and start service
mongoose
  .connect(
    `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authSource=${DB_DATABASE_AUTH}&readPreference=primary&ssl=false`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 30,
      dbName: DB_DATABASE,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
