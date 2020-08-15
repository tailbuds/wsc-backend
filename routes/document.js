/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const express = require('express');
const multer = require('multer');
const router = express.Router();

const documentController = require('../controllers/document');

const maxSize = 1024 * 1024 * 4;
// * Images storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './documents/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') +
        file.originalname.replace(/ /g, '+')
    );
  },
});

// Images  filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb('Error: Only PDF Allowed');
  }
};

// initializing multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
});

// * PATCH documents to scorecard
router.patch(
  '/uploads/:scId',
  upload.fields([
    { name: 'networth', maxCount: 1 },
    { name: 'support', maxCount: 1 },
  ]),
  documentController.patchDocument
);

module.exports = router;
