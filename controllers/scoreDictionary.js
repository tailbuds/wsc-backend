/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const ScoreDictionary = require('../models/scoreDictionary');

// GET
exports.getScoreDictionary = (req, res, next) => {
  ScoreDictionary.find()
    .then((sd) => res.status(200).json(sd))
    .catch((err) => {
      res.status(400).json({
        success: 0,
        reason: err.message,
      });
    });
};

// PUT
exports.putScoreDictionary = (req, res, next) => {
  switch (req.query.update) {
    case 'facilityScores':
      ScoreDictionary.findByIdAndUpdate(
        req.query.id,
        { facilityScores: req.body.facilityScores },
        { useFindAndModify: false }
      )
        .then((sd) => {
          res.status(200).json({
            success: 1,
            preUpdate: {
              facilityScores: sd.facilityScores,
            },
            postUpdate: {
              facilityScores: req.body.facilityScores,
            },
          });
        })
        .catch((err) => {
          res.status(400).json({ success: 0, reason: err.message });
        });
      break;
    case 'obligorScores':
      ScoreDictionary.findByIdAndUpdate(
        req.query.id,
        { obligorScores: req.body.obligorScores },
        { useFindAndModify: false }
      )
        .then((sd) => {
          res.status(200).json({
            success: 1,
            preUpdate: {
              obligorScores: sd.obligorScores,
            },
            postUpdate: {
              obligorScores: req.body.obligorScores,
            },
          });
        })
        .catch((err) => {
          res.status(400).json({ success: 0, reason: err.message });
        });
      break;
  }
};

//POST
exports.postScoreScoreDictionary = (req, res, next) => {
  const sd = new ScoreDictionary(req.body);
  sd.save()
    .then((sl) => res.status(201).json({ success: 1, created: sl }))
    .catch((err) => {
      res.status(400).json({
        success: 0,
        reason: err.message,
      });
    });
};
