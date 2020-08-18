const Scorecard = require('../models/scorecard');
const ScoreDictionary = require('../models/scoreDictionary');

exports.scoreCalculator = (sId) => {
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

  const orrFields = [
    'ageRange',
    'nationality',
    'repaymentSource',
    'oneYearDpd',
    'relationYears',
    'businessYears',
  ];

  return new Promise((resolve, reject) => {
    Scorecard.findById(sId)
      .then((sc) => {
        data.sc = sc;
        data.customer = sc.customer;
        data.fc = sc.customer.facilities;
        return;
      })
      .then(() => {
        return ScoreDictionary.findById('1');
      })
      .then((sd) => {
        data.orr = sd.obligorScores;
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
        let orrScore = 0;

        //Direct field Inside Customer table
        orrFields.map((type) => {
          data.orr[type].map((v) => {
            if (v._id === data.customer[type]) orrScore += v.value;
          });
        });

        //Networth
        data.orr.networth.map((v) => {
          if (v._id === data.customer.networth.position) orrScore += v.value;
        });

        data.orr.networthSupport.map((v) => {
          if (v._id === data.customer.networth.document) orrScore += v.value;
        });

        //BCSB

        data.orr.individualStatus.map((v) => {
          if (v._id === data.customer.bcsb.status) orrScore += v.value;
        });

        data.orr.relatedCompaniesStatus.map((v) => {
          if (v._id === data.customer.bcsb.status) orrScore += v.value;
        });
        console.log('orrScore= ' + orrScore);
        return resolve({ facilities, orrScore });
      })
      .catch((err) => console.log(err));
  });
};

/*
 networth: {
    value: '3051000.000',
    position: '2.5-5 million OMR',
    document: 'auditor C',
    file: null
  },
  bcsb: {
    totalExistingLimit: '383000.000',
    status: 'NORMAL',
    relatedCompaniesStatus: 'NORMAL'
  }
{
 internalNetworthLimitRatio: [
    { value: 50, _id: 'greater than 6' },
    { value: 30, _id: '6-4' },
    { value: 20, _id: '4-2' },
    { value: 0, _id: 'less then 2' }
  ],
  totalNetworthLimitRation: [
    { value: 50, _id: 'greater than 4' },
    { value: 30, _id: '4-2.5' },
    { value: 20, _id: '2.5-1.5' },
    { value: 0, _id: 'less then 1.5' }
  ],
}
  },
*/
