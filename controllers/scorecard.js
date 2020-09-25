const Scorecard = require('../models/scorecard');
const scoreCalculator = require('../util/scoreCalculator');
const gradeCalculator = require('../util/gradeCalculator');
const User = require('../models/user');

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

// * GET scorecard
exports.getScorecards = (req, res, next) => {
  Scorecard.find()
    .populate('maker.user', 'username _id')
    .populate('approver.user', 'username _id')
    .then((sc) => res.status(200).json(sc))
    .catch((err) => {
      res.status(400).json({ success: 0, reason: err.message });
    });
};

// * GET scorecard by user id
exports.getUserScorecards = (req, res, next) => {
  Scorecard.find()
    .where({ 'maker.user': req.query.uid })
    .populate('maker.user', 'username _id')
    .populate('approver.user', 'username _id')
    .then((sc) => res.status(200).json(sc))
    .catch((err) => {
      res.status(400).json({ success: 0, reason: err.message });
    });
};

// * GET scorecard based on _id
exports.getScorecard = (req, res, next) => {
  Scorecard.findById(req.params.id)
    .populate('maker.user', 'username _id')
    .populate('approver.user', 'username _id')
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
// exports.patchScorecard = (req, res, next) => {
//   const responseBuilder = { success: 1, postUpdate: {}, preUpdate: {} };
//   const parent = req.query.parent;
//   const child = req.query.child;
//   if (!parent) {
//     return res.status(422).json({
//       success: 0,
//       reason: 'err: no parent',
//     });
//   }
//   if (parent && child) {
//     return Scorecard.findByIdAndUpdate(
//       req.query.id,
//       { [parent + '.' + child]: req.body[parent][child] },
//       {
//         //overwrite: true,
//         runValidators: true,
//         useFindAndModify: false,
//         returnOriginal: true,
//       }
//     )
//       .then((sc) => {
//         responseBuilder.preUpdate = sc[parent][child];
//         return;
//       })
//       .then(() => {
//         return Scorecard.findById(req.query.id);
//       })
//       .then((sc) => {
//         responseBuilder.postUpdate = sc[parent][child];
//         return responseBuilder;
//       })
//       .then((response) => {
//         res.status(202).json(response);
//       })
//       .catch((err) => {
//         res.status(422).json({
//           success: 0,
//           reason: err.message,
//         });
//       });
//   }
//   if (parent && !child) {
//     return Scorecard.findByIdAndUpdate(
//       req.query.id,
//       { [parent]: req.body[parent] },
//       {
//         runValidators: true,
//         useFindAndModify: false,
//         returnOriginal: true,
//       }
//     )
//       .then((sc) => {
//         responseBuilder.preUpdate = sc[parent];
//         return;
//       })
//       .then(() => {
//         return Scorecard.findById(req.query.id);
//       })
//       .then((sc) => {
//         responseBuilder.postUpdate = sc[parent];
//         return responseBuilder;
//       })
//       .then((response) => {
//         res.status(202).json(response);
//       })
//       .catch((err) => {
//         res.status(422).json({
//           success: 0,
//           reason: err.message,
//         });
//       });
//   }
// };

// * PATCH for scoring

exports.patchScorecard = (req, res, next) => {
  const responseBuilder = { success: 1, postUpdate: {}, preUpdate: {} };
  const parent = req.query.parent;
  const child = req.query.child;
  const subchild = req.query.subchild;
  if (!parent) {
    return res.status(422).json({
      success: 0,
      reason: 'err: no parent',
    });
  }
  if (parent && child && !subchild) {
    return Scorecard.findByIdAndUpdate(
      req.query.id,
      { [parent + '.' + child]: req.body[parent][child] },
      {
        //overwrite: true,
        runValidators: true,
        useFindAndModify: false,
        returnOriginal: true,
      }
    )
      .then((sc) => {
        responseBuilder.preUpdate = sc[parent][child];
        return;
      })
      .then(() => {
        return Scorecard.findById(req.query.id);
      })
      .then((sc) => {
        responseBuilder.postUpdate = sc[parent][child];
        return responseBuilder;
      })
      .then((response) => {
        res.status(202).json(response);
      })
      .catch((err) => {
        res.status(422).json({
          success: 0,
          reason: err.message,
        });
      });
  }
  if (parent && !child && !subchild) {
    return Scorecard.findByIdAndUpdate(
      req.query.id,
      { [parent]: req.body[parent] },
      {
        runValidators: true,
        useFindAndModify: false,
        returnOriginal: true,
      }
    )
      .then((sc) => {
        responseBuilder.preUpdate = sc[parent];
        return;
      })
      .then(() => {
        return Scorecard.findById(req.query.id);
      })
      .then((sc) => {
        responseBuilder.postUpdate = sc[parent];
        return responseBuilder;
      })
      .then((response) => {
        res.status(202).json(response);
      })
      .catch((err) => {
        res.status(422).json({
          success: 0,
          reason: err.message,
        });
      });
  }

  if (parent && child && subchild) {
    return Scorecard.findByIdAndUpdate(
      req.query.id,
      {
        [parent + '.' + child + '.' + subchild]: req.body[parent][child][
          subchild
        ],
      },
      {
        //overwrite: true,
        runValidators: true,
        useFindAndModify: false,
        returnOriginal: true,
      }
    )
      .then((sc) => {
        responseBuilder.preUpdate = sc[parent][child][subchild];
        return;
      })
      .then(() => {
        return Scorecard.findById(req.query.id);
      })
      .then((sc) => {
        responseBuilder.postUpdate = sc[parent][child][subchild];
        return responseBuilder;
      })
      .then((response) => {
        res.status(202).json(response);
      })
      .catch((err) => {
        res.status(422).json({
          success: 0,
          reason: err.message,
        });
      });
  }
};

exports.patchScoring = (req, res, next) => {
  const responseBuilder = { success: 1, postUpdate: {}, preUpdate: {} };
  scoreCalculator
    .scoreCalculator(req.query.id)
    .then((result) => {
      responseBuilder.success = 1;
      responseBuilder.postUpdate.orr = result.orr;
      return result;
    })
    .then((result) => {
      return Scorecard.findByIdAndUpdate(
        req.query.id,
        { 'customer.facilities': result.facilities, orr: result.orr },
        { runValidators: true, useFindAndModify: false, returnOriginal: true }
      );
    })
    .then((old) => {
      responseBuilder.preUpdate = {
        orr: old.orr ? old.orr.toString() : old.orr,
        facilities: old.customer.facilities,
        orrGrade: old.orrGrade,
      };
      return responseBuilder;
    })
    .then(() => gradeCalculator.gradeCalculator(req.query.id))
    .then((result) => {
      return Scorecard.findByIdAndUpdate(
        req.query.id,
        { 'customer.facilities': result.facilities, orrGrade: result.orrGrade },
        { runValidators: true, useFindAndModify: false, returnOriginal: false }
      );
    })
    .then((sc) => {
      responseBuilder.postUpdate.facilities = sc.customer.facilities;
      responseBuilder.postUpdate.orrGrade = sc.orrGrade;
      return;
    })
    .then(() => res.status(202).json(responseBuilder))
    .catch((err) => {
      res.status(422).json({
        success: 0,
        reason: err.message,
      });
    });
};
