/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const express = require('express');
const router = express.Router();

const scoreDictionaryController = require('../controllers/scoreDictionary');

// GET
router.get('/scoredictionary', scoreDictionaryController.getScoreDictionary);

// PUT
router.put('/scoredictionary', scoreDictionaryController.putScoreDictionary);

// POST
router.post('/scoredictionary', scoreDictionaryController.postScoreDictionary);

module.exports = router;
