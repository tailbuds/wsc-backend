/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const express = require('express');
const router = express.Router();

const scaleController = require('../controllers/scale');

// GET
router.get('/scale', scaleController.getScale);

// PUT
router.put('/scale', scaleController.putScale);

//POST
// router.post('/scale', scaleController.postScale);

module.exports = router;
