/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const mongoose = require('mongoose');

const Scorecard = require('../models/scorecard');

// POST create scorecard
exports.postScorecard = (req, res, next) => {
  const request = req.body;
  const scorecard = new Scorecard({
    customer: {
      name: req.body.customer.name,
      new: req.body.customer.new,
    },
  });
  scorecard
    .save()
    .then((sc) => res.status(201).json({ success: 1, created: sc }))
    .catch((err) => {
      res.status(400).json({
        success: 0,
        reason: err.message,
      });
    });
};
