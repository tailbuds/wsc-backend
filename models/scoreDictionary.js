/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keyValuePairSchema = new Schema({
  _id: {
    type: String,
    required: true,
    allowNull: false,
    default: '0',
  },
  value: {
    type: Number,
    required: true,
    allowNull: false,
    default: 0,
  },
});

const scoreDictionarySchema = new Schema(
  {
    _id: {
      type: Number,
      required: false,
      allowNull: false,
      default: 1,
      validate: {
        validator: (v) => v === 1,
      },
    },
    facilityScores: {
      cashMargin: [keyValuePairSchema],
      bankGuaranteeOne: [keyValuePairSchema],
      bankGuaranteeTwo: [keyValuePairSchema],
      shares: [keyValuePairSchema],
      freeholdFirstDegree: [keyValuePairSchema],
      leaseholdFirstDegree: [keyValuePairSchema],
      freeholdSecondDegree: [keyValuePairSchema],
    },
    obligorScores: {
      networth: [keyValuePairSchema],
      networthSupport: [keyValuePairSchema],
      repaymentSource: [keyValuePairSchema],
      internalNetworthLimitRatio: [keyValuePairSchema],
      totalNetworthLimitRation: [keyValuePairSchema],
      individualStatus: [keyValuePairSchema],
      relatedCompaniesStatus: [keyValuePairSchema],
      oneYearDpd: [keyValuePairSchema],
      relationYears: [keyValuePairSchema],
      nationality: [keyValuePairSchema],
      businessYears: [keyValuePairSchema],
      ageRange: [keyValuePairSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('scoreDictionary', scoreDictionarySchema);
