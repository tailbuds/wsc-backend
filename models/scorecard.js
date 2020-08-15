/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const mongoose = require('mongoose');

const helper = require('../util/validators.js');

const Schema = mongoose.Schema;

const facilitySchema = new Schema(
  {
    product: {
      type: String,
      allowNull: true,
      required: false,
      default: null,
    },
    limit: {
      type: String,
      required: false,
      allowNull: true,
      default: null,
      validate: {
        validator: (v) => helper.isAmount(v),
        message: (value) => `${value.value} is not a valid amount`,
      },
    },
    collateralValue: {
      type: String,
      required: false,
      allowNull: true,
      default: null,
      validate: {
        validator: (v) => helper.isAmount(v),
        message: (value) => `${value.value} is not a valid amount`,
      },
    },
    collateralCoveragePercent: {
      cashMargin: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        enum: [
          '0',
          '10%-25%',
          '25%-50%',
          '50%-75%',
          '75%-100%',
          'greater than 100%',
        ],
      },
      bankGuaranteeOne: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        enum: ['0', '25%-50%', '50%-75%', '75%-100%', 'greater than 100%'],
      },
      bankGuaranteeTwo: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        enum: ['0', '25%-50%', '50%-75%', '75%-100%', 'greater than 100%'],
      },
      shares: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        enum: [
          '0',
          '10%-50%',
          '50%-75%',
          '75%-125%',
          '125%-150%',
          'greater than 150%',
        ],
      },
      freeholdFirstDegree: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        enum: [
          '0',
          '10%-50%',
          '50%-75%',
          '75%-125%',
          '125%-150%',
          'greater than 150%',
        ],
      },
      leaseholdFirstDegree: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        enum: ['0', '75%-100%', '100%-150%', '150%-200%', 'greater than 200%'],
      },
      freeholdSecondDegree: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        enum: ['0', '100%-150%', '150%-200%', '200%-250%', 'greater than 250%'],
      },
    },
    score: {
      type: Number,
      allowNull: true,
      required: false,
      default: null,
    },
  },
  { timestamps: false, toJSON: { virtuals: true } }
);

facilitySchema.virtual('collateralCoverageRatio').get(function () {
  return `${+this.collateralValue / +this.limit}`;
});

const scorecardSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      primaryKey: true,
      allowNull: false,
      auto: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
        unique: false,
        allowNull: false,
        uppercase: true,
        maxLength: 135,
        validate: {
          validator: (name) => {
            const pattern =
              '(^[A-Za-z]{3,25})([ ]{0,1})([A-Za-z]{3,25})?([ ]{0,1})?([A-Za-z]{3,25})?([ ]{0,1})??([A-Za-z]{3,25})?([ ]{0,1})??([A-Za-z]{3,25})';
            if (name.match(pattern)) {
              return true;
            }
            return false;
          },
          message: (props) => `[${props.value}] is not valid name`,
        },
      },
      new: {
        type: Boolean,
        required: true,
        allowNull: false,
      },
      id: {
        type: String,
        required: true,
        allowNull: false,
        maxLength: 25,
      },
      gender: {
        type: String,
        required: false,
        allowNull: true,
        default: null,
        enum: ['male', 'female', 'other', null],
      },
      ageRange: {
        type: String,
        required: false,
        allowNull: true,
        default: null,
        enum: [
          'less than 30',
          '30-45',
          '45-55',
          '55-65',
          '65-70',
          'more than 70',
          null,
        ],
      },
      nationalityType: {
        type: String,
        required: false,
        allowNull: true,
        default: null,
        enum: ['omani', 'gcc', 'expat', null],
      },
      networth: {
        value: {
          type: String,
          required: false,
          allowNull: true,
          default: null,
          validate: {
            validator: (v) => helper.isAmount(v),
            message: (value) => `${value.value} is not a valid amount`,
          },
        },
        position: {
          type: String,
          required: false,
          allowNull: true,
          default: null,
          enum: [
            'not available',
            'less than 1 million OMR',
            '1-2.5 million OMR',
            '2.5-5 million OMR',
            'more than 5 million OMR',
            null,
          ],
        },
        document: {
          type: String,
          required: false,
          allowNull: true,
          default: null,
          enum: [
            'auditor A',
            'auditor B',
            'auditor C',
            'self declared',
            'no information',
            null,
          ],
        },
        file: {
          type: String,
          required: false,
          allowNull: true,
          default: null,
        },
      },
      repaymentSource: {
        type: String,
        allowNull: true,
        required: false,
        default: null,
        enum: [
          'assigned cash flow above 150%',
          'assigned cash flow 100%-150%',
          'assigned cash flow below 100%',
          'identified cash flow not assigned',
          'unidentified cashflow',
          null,
        ],
      },
      proposedLimit: {
        type: String,
        required: false,
        allowNull: true,
        default: null,
        validate: {
          validator: (v) => helper.isAmount(v),
          message: (value) => `${value.value} is not a valid amount`,
        },
      },
      bcsb: {
        totalExistingLimit: {
          type: String,
          required: false,
          allowNull: true,
          default: null,
          validate: {
            validator: (v) => helper.isAmount(v),
            message: (value) => `${value.value} is not a valid amount`,
          },
        },
        status: {
          type: String,
          allowNull: true,
          required: false,
          default: null,
          enum: [
            'NORMAL',
            'WATCHLIST (O.L.E.M)',
            'SUB-STANDARD',
            'DOUBTFUL',
            'LOSS',
            'no information (no history)',
            null,
          ],
        },
        relatedCompaniesStatus: {
          type: String,
          allowNull: true,
          required: false,
          default: null,
          enum: [
            'NORMAL',
            'WATCHLIST (O.L.E.M)',
            'SUB-STANDARD',
            'DOUBTFUL',
            'LOSS',
            'NA (no related company)',
            null,
          ],
        },
      },
      dpdOneYear: {
        type: String,
        allowNull: true,
        required: false,
        default: null,
        enum: [
          '0',
          '1-29:less than 2',
          '1-29:3-5',
          '1-29:more than 5',
          '30-59:less than 2',
          '30-59:3-5',
          '30-59:more than 5',
          '60-89:less than 2',
          '60-89:3-5',
          '60-89:more than 5',
          'above 90 days:1',
          'above 90 days:2 and above',
          'NA (new customer)',
          null,
        ],
      },
      relationYears: {
        type: String,
        allowNull: true,
        required: false,
        default: null,
        enum: ['less than 1', '1-3', '3-5', 'more than 5', null],
      },
      businessYears: {
        type: String,
        allowNull: true,
        required: false,
        default: null,
        enum: ['more than 20', '10-20', '3-10', '0-3', 'no business', null],
      },
      facilities: [facilitySchema],
      supportDocumentsFile: {
        type: String,
        allowNull: true,
        required: false,
        default: null,
      },
    },
    orr: {
      type: Number,
      allowNull: true,
      required: false,
      default: null,
    },
    expiryDt: {
      type: Date,
      required: false,
      allowNull: true,
      default: null,
    },
    maker: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        allowNull: false,
        required: false,
      },
      submitted: {
        type: Boolean,
        allowNull: false,
        required: false,
        default: false,
      },
      submitDate: {
        type: Date,
        required: false,
        allowNull: true,
        default: null,
        validate: {
          validator: function (v) {
            if (this.maker.submitted && v) {
              return true;
            }
            if (!this.maker.submitted && v === null) {
              return true;
            }
            return false;
          },
          message: 'inconsistency in the maker object',
        },
      },
    },
    approver: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        allowNull: false,
        default: null,
      },
      approved: {
        type: Boolean,
        allowNull: true,
        required: false,
        default: null,
        validate: {
          validator: function (v) {
            if (this.approver.user === null && v === null) {
              return true;
            }
            if (
              (this.approver.user && v === true) ||
              (this.approver.user && v === false)
            ) {
              return true;
            }
            return false;
          },
          message: 'inconsistency in the approver object',
        },
      },
      submitDate: {
        type: Date,
        required: false,
        allowNull: true,
        default: null,
        validate: {
          validator: function (v) {
            if (this.approver.user === null && v === null) {
              return true;
            }
            if (this.approver.user && v) {
              return true;
            }
            return false;
          },
          message: 'inconsistency in the approver object',
        },
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

scorecardSchema.virtual('status').get(function () {
  today = new Date();
  if (this.expiryDt < today) {
    return 'expired';
  }
  if (!this.maker.submitted) {
    return 'draft';
  }
  if (this.maker.submitted && this.approver.approved === null) {
    return 'inProcess';
  }
  if (this.maker.submitted && this.approver.approved === true) {
    return 'approved';
  }
  if (this.maker.submitted && this.approver.approved === false) {
    return 'rejected';
  }
});

scorecardSchema.virtual('customer.wtdAvgFacilityScore').get(function () {
  const limits = this.customer.facilities.map((facility) => +facility.limit);
  const totalLimit = limits.reduce((a, b) => a + b, 0);
  const wtdScores = this.customer.facilities.map(
    (facility) => facility.score * facility.limit
  );
  const wtdTotalScore = wtdScores.reduce((a, b) => a + b, 0);
  return wtdTotalScore / totalLimit;
});

scorecardSchema.virtual('customer.limitCheck').get(function () {
  const limits = this.customer.facilities.map((facility) => +facility.limit);
  const totalLimit = limits.reduce((a, b) => a + b, 0);
  const totalProposedLimit = +this.customer.proposedLimit;
  return totalLimit === totalProposedLimit;
});

module.exports = mongoose.model('Scorecard', scorecardSchema);
