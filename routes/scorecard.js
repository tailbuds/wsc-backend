/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const express = require('express');
const router = express.Router();

const scorecardController = require('../controllers/scorecard');

// POST scorecard
router.post('/scorecards', scorecardController.postScorecard);

// * GET scorecard based on user ID
router.get('/scorecards/users', scorecardController.getUserScorecards);

// * GET Scorecard
router.get('/scorecards/:id', scorecardController.getScorecard);

// GET Scorecards
router.get('/scorecards', scorecardController.getScorecards);

// DELETE Scorecard
router.delete('/scorecards/:id', scorecardController.deleteScorecard);

// PATCH scorecard
router.patch('/scorecards', scorecardController.patchScorecard);

// PATCH scoring
router.patch('/scoring', scorecardController.patchScoring);

module.exports = router;
