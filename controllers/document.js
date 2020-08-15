/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const fs = require('fs');
const path = require('../util/path');

// * Importing environment variable
require('dotenv').config();

let PROTOCOL;
let SERVER_NAME;
let PROXY_PORT;

if (process.env.NODE_ENV === 'development') {
  PROTOCOL = process.env.DEV_SERVER_TYPE;
  SERVER_NAME = process.env.DEV_SERVER_NAME;
  PROXY_PORT = process.env.DEV_PROXY_PORT;
}
if (process.env.NODE_ENV === 'test') {
  PROTOCOL = process.env.TEST_SERVER_TYPE;
  SERVER_NAME = process.env.TEST_SERVER_NAME;
  PROXY_PORT = process.env.TEST_PROXY_PORT;
}
if (process.env.NODE_ENV === 'production') {
  PROTOCOL = process.env.PROD_SERVER_TYPE;
  SERVER_NAME = process.env.PROD_SERVER_NAME;
  PROXY_PORT = process.env.PROD_PROXY_PORT;
}

const Scorecard = require('../models/scorecard');
exports.patchDocument = (req, res, next) => {
  switch (req.query.doc) {
    case 'networth':
      Scorecard.findByIdAndUpdate(
        req.params.scId,
        { 'customer.networth.file': req.files.networth[0].path },
        { useFindAndModify: false, returnOriginal: true }
      )
        .then((sc) => {
          res.status(202).json({
            success: 1,
            updated: `${PROTOCOL}://${SERVER_NAME}:${PROXY_PORT}/${sc.customer.networth.file}`,
          });
          return sc.customer.networth.file;
        })
        .then((oldFileName) => {
          if (oldFileName) {
            let newFileName =
              path + '/archive/' + oldFileName.split(/[\\/]/)[1];
            fs.rename(oldFileName, newFileName, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        })
        .catch((err) => {
          res.status(422).json({
            success: 0,
            reason: err.message,
          });
        });

    case 'support':
      Scorecard.findByIdAndUpdate(
        req.params.scId,
        { 'customer.supportDocumentsFile': req.files.support[0].path },
        { useFindAndModify: false, returnOriginal: true }
      )
        .then((sc) => {
          res.status(202).json({
            success: 1,
            updated: `${PROTOCOL}://${SERVER_NAME}:${PROXY_PORT}/${sc.customer.supportDocumentsFile}`,
          });
          return sc.customer.supportDocumentsFile;
        })
        .then((oldFileName) => {
          if (oldFileName) {
            let newFileName =
              path + '/archive/' + oldFileName.split(/[\\/]/)[1];
            fs.rename(oldFileName, newFileName, (err) => {
              if (err) {
                throw err;
              }
            });
          }
        })
        .catch((err) => {
          res.status(422).json({
            success: 0,
            reason: err.message,
          });
        });
  }
};
