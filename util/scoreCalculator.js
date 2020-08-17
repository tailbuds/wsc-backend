const Scorecard = require('../models/scorecard');
const ScoreDictionary = require('../models/scoreDictionary');

exports.facilityScoreCalculator = (sId) => {
  const data = {};
  const facilities = [];
  const fLoop = [
    'cashMargin',
    'bankGuaranteeOne',
    'bankGuaranteeTwo',
    'shares',
    'freeholdFirstDegree',
    'leaseholdFirstDegree',
    'freeholdSecondDegree',
  ];
  return new Promise((resolve, reject) => {
    Scorecard.findById(sId)
      .then((sc) => {
        data.fc = sc.customer.facilities;
        return;
      })
      .then(() => {
        return ScoreDictionary.findById('1');
      })
      .then((sd) => {
        data.fs = sd.facilityScores;
        return data;
      })
      .then((data) => {
        data.fc.map((v) => {
          let score = 0;
          fLoop.map((type) => {
            if (v.collateralCoveragePercent[type]) {
              score += data.fs[type].filter(
                (cm) => cm._id === v.collateralCoveragePercent[type]
              )[0].value;
            }
          });
          v.score = score;
          facilities.push(v);
        });
        return resolve(facilities);
      })
      .catch((err) => console.log(err));
  });
};

// Object.entries(obj).forEach(([key, value]) => {
//   console.log(`${key} ${value}`);
// });
/*
v={
  collateralCoveragePercent=collateralCoveragePercent: {
    cashMargin: '75%-100%',
    bankGuaranteeOne: '0',
    bankGuaranteeTwo: '0',
    shares: '0',
    freeholdFirstDegree: 'greater than 150%',
    leaseholdFirstDegree: null,
    freeholdSecondDegree: null
  },
  product: 'Ijarah Finance',
  limit: '148000.000',
  collateralValue: '840000.000',
  score: null,
  _id: 5f3a641517853c4c9c037aec
}



*/
