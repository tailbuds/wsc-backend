/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const scorecardController = require('../controllers/scorecard');

// POST scorecard
router.post('/scorecard', scorecardController.postScorecard);

module.exports = router;
