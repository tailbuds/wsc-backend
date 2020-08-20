/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const ScoreDictionary = require('../models/scoreDictionary');
const Scorecard = require('../models/scorecard');

exports.isAmount = function (value) {
  value.match('^[d]+[.][d]{3}$');
};

exports.dataHelper = (type, field, checkValue) => {
  return new Promise((resolve, reject) => {
    ScoreDictionary.findById('1')
      .then((sd) => {
        return sd[type][field];
      })
      .then((data) => {
        const list = [];
        data.map((v) => {
          list.push(v._id);
        });
        list.push(null);
        return list;
      })
      .then((list) => {
        return resolve(list.includes(checkValue));
      })
      .catch((err) => {
        reject(err);
      });
  });
};
