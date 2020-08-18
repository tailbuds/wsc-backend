const Scorecard = require('../models/scorecard');
const scoreCalculator = require('../util/scoreCalculator.js');
// POST create scorecard
exports.postScorecard = (req, res, next) => {
  const scorecard = new Scorecard(req.body);
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

// * GET scorecards

exports.getScorecards = (req, res, next) => {
  Scorecard.find()
    .then((sc) => res.status(200).json(sc))
    .catch((err) => {
      res.status(400).json({ success: 0, reason: err.message });
    });
};

// * GET scorecard based on _id

exports.getScorecard = (req, res, next) => {
  Scorecard.findById(req.params.id)
    .then((sc) => res.status(200).json(sc))
    .catch((err) => {
      res.status(400).json({ success: 0, reason: err.message });
    });
};

// * DELETE scorecard from _id
exports.deleteScorecard = (req, res, next) => {
  Scorecard.findByIdAndDelete(req.params.id)
    .then((sc) => {
      if (sc) {
        return res.status(201).json({ success: 1, deleted: sc });
      }
      return res.status(422).json({
        success: 0,
        reason: "document doesn't exist",
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: 0,
        reason: err.message,
      });
    });
};

// * PATCH scorecard
// exports.patchScoreCard = (req, res, next) = {};

// * PATCH for scoring

exports.patchScoring = (req, res, next) => {
  const responseBuilder = {};
  scoreCalculator
    .scoreCalculator(req.query.id)
    .then((result) => {
      responseBuilder.success = 1;
      responseBuilder.postUpdate = result.facilities;
      return result;
    })
    .then((result) => {
      return Scorecard.findByIdAndUpdate(
        req.query.id,
        { 'customer.facilities': result.facilities, orr: result.orrScore },
        { useFindAndModify: false, returnOriginal: true }
      );
    })
    .then((old) => {
      responseBuilder.preUpdate = old.customer.facilities;
      return responseBuilder;
    })
    .then((response) => res.status(202).json(response))
    .catch((err) => {
      res.status(422).json({
        success: 0,
        reason: err.message,
      });
    });
};
