/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const Scale = require('../models/scale');

//GET
exports.getScale = (req, res, next) => {
  Scale.find()
    .then((sl) => res.status(200).json(sl[0]))
    .catch((err) => {
      res.status(400).json({
        success: 0,
        reason: err.message,
      });
    });
};

//PUT
exports.putScale = (req, res, next) => {
  switch (req.query.update) {
    case 'orrScale':
      Scale.findByIdAndUpdate(
        req.query.id,
        { orrScale: req.body.orrScale },
        { useFindAndModify: false, returnOriginal: true }
      )
        .then((sl) => {
          res.status(200).json({
            success: 1,
            preUpdate: { orrScale: sl.orrScale },
            postUpdate: { orrScale: req.body.orrScale },
          });
        })
        .catch((err) => {
          res.status(400).json({ success: 0, reason: err.message });
        });
      break;

    case 'frrScale':
      Scale.findByIdAndUpdate(
        req.query.id,
        { frrScale: req.body.frrScale },
        { useFindAndModify: false, returnOriginal: true }
      )
        .then((sl) => {
          res.status(200).json({
            success: 1,
            preUpdate: { frrScale: sl.frrScale },
            postUpdate: { frrScale: req.body.frrScale },
          });
        })
        .catch((err) => {
          res.status(400).json({ success: 0, reason: err.message });
        });
      break;
  }
};

//POST
exports.postScale = (req, res, next) => {
  const scale = new Scale(req.body);
  scale
    .save()
    .then((sl) => res.status(201).json({ success: 1, created: sl }))
    .catch((err) => {
      res.status(400).json({
        success: 0,
        reason: err.message,
      });
    });
};
