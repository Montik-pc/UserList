require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const logger = require('./logger');
const cors = require('cors');
const router = require('./router');

function startApp() {
  const app = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use('/', router);
  app.disable('x-powered-by');

  process.on('unhandledRejection', (err) => {
    logger.error('Important error: ', err);
  });

  return app;
}

module.exports = startApp;