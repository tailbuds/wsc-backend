const Scale = require('../models/scale');
const Scorecard = require('../models/scorecard');

exports.gradeCalculator = (sId) => {
  const data = {};
  const facilities = [];
  return new Promise((resolve, reject) => {
    Scorecard.findById(sId)
      .then((sc) => {
        data.orr = sc.orr;
        data.facilities = sc.customer.facilities;
        return;
      })
      .then(() => {
        return Scale.findById('1');
      })
      .then((sl) => {
        data.orrGrade = sl.orrScale.filter(
          (val) => val.lower < data.orr && data.orr <= val.upper
        )[0];

        return sl.frrScale;
      })
      .then((frrScale) => {
        data.facilities.map((fc) => {
          const fGrade = frrScale.filter(
            (val) => val.lower < +fc.score && +fc.score <= val.upper
          );
          fc.grade = fGrade[0];
          facilities.push(fc);
        });
        return facilities;
      })
      .then((facilities) => {
        data.facilities = facilities;

        return resolve({
          facilities: data.facilities,
          orrGrade: data.orrGrade,
        });
      })
      .catch((err) => reject(err));
  });
};
