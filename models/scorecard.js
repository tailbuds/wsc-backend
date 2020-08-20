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
      allowNull: false,
      default: '0',
      validate: {
        validator: (v) => helper.isAmount(v),
        message: (value) => `${value.value} is not a valid amount`,
      },
    },
    collateralCoveragePercent: {
      cashMargin: {
        type: String,
        required: false,
        validate: {
          validator: (v) => {
            return helper.dataHelper('facilityScores', 'cashMargin', v);
          },
          message: 'CashMargin not valid',
        },
        allowNull: false,
        default: '0',
      },
      bankGuaranteeOne: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        validate: {
          validator: (v) => {
            return helper.dataHelper('facilityScores', 'bankGuaranteeOne', v);
          },
          message: 'bankGuaranteeOne not valid',
        },
      },
      bankGuaranteeTwo: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        validate: {
          validator: (v) => {
            return helper.dataHelper('facilityScores', 'bankGuaranteeTwo', v);
          },
          message: 'bankGuaranteeTwo not valid',
        },
      },
      shares: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        validate: {
          validator: (v) => {
            return helper.dataHelper('facilityScores', 'shares', v);
          },
          message: 'shares not valid',
        },
      },
      freeholdFirstDegree: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        validate: {
          validator: (v) => {
            return helper.dataHelper(
              'facilityScores',
              'freeholdFirstDegree',
              v
            );
          },
          message: 'freeholdFirstDegree not valid',
        },
      },
      leaseholdFirstDegree: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        validate: {
          validator: (v) => {
            return helper.dataHelper(
              'facilityScores',
              'leaseholdFirstDegree',
              v
            );
          },
          message: 'leaseholdFirstDegree not valid',
        },
      },
      freeholdSecondDegree: {
        type: String,
        allowNull: false,
        required: false,
        default: '0',
        validate: {
          validator: (v) => {
            return helper.dataHelper(
              'facilityScores',
              'freeholdSecondDegree',
              v
            );
          },
          message: 'freeholdSecondDegree not valid',
        },
      },
    },
    score: {
      type: Number,
      allowNull: true,
      required: false,
      default: null,
    },
    grade: {
      type: Object,
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
        validate: {
          validator: (v) => {
            return helper.dataHelper('obligorScores', 'ageRange', v);
          },
          message: 'ageRange not valid',
        },
      },
      nationalityType: {
        type: String,
        required: false,
        allowNull: true,
        default: null,
        validate: {
          validator: (v) => {
            return helper.dataHelper('obligorScores', 'nationality', v);
          },
          message: 'nationalityType not valid',
        },
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
          validate: {
            validator: (v) => {
              return helper.dataHelper('obligorScores', 'networth', v);
            },
            message: 'networth.position not valid',
          },
        },
        document: {
          type: String,
          required: false,
          allowNull: true,
          default: null,
          validate: {
            validator: (v) => {
              return helper.dataHelper('obligorScores', 'networthSupport', v);
            },
            message: 'networth.document not valid',
          },
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
        validate: {
          validator: (v) => {
            return helper.dataHelper('obligorScores', 'repaymentSource', v);
          },
          message: 'repaymentSource not valid',
        },
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
          validate: {
            validator: (v) => {
              return helper.dataHelper('obligorScores', 'individualStatus', v);
            },
            message: 'bcsb.status not valid',
          },
        },
        relatedCompaniesStatus: {
          type: String,
          allowNull: true,
          required: false,
          default: null,
          validate: {
            validator: (v) => {
              return helper.dataHelper(
                'obligorScores',
                'relatedCompaniesStatus',
                v
              );
            },
            message: 'bcsb.relatedCompaniesStatus not valid',
          },
        },
      },
      dpdOneYear: {
        type: String,
        allowNull: true,
        required: false,
        default: null,
        validate: {
          validator: (v) => {
            return helper.dataHelper('obligorScores', 'oneYearDpd', v);
          },
          message: 'oneYearDpd not valid',
        },
      },
      relationYears: {
        type: String,
        allowNull: true,
        required: false,
        default: null,
        validate: {
          validator: (v) => {
            return helper.dataHelper('obligorScores', 'relationYears', v);
          },
          message: 'relationYears not valid',
        },
      },
      businessYears: {
        type: String,
        allowNull: true,
        required: false,
        default: null,
        validate: {
          validator: (v) => {
            return helper.dataHelper('obligorScores', 'businessYears', v);
          },
          message: 'businessYears not valid',
        },
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
    orrGrade: {
      type: Object,
      allowNull: true,
      require: false,
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
            if (!this.maker) {
              return true;
            } else {
              if (this.maker.submitted && v) {
                return true;
              }
              if (!this.maker.submitted && v === null) {
                return true;
              }
              return false;
            }
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
        validate: {
          validator: function (v) {
            if (v === null || !this.maker) {
              return true;
            } else {
              return v.toString() !== this.maker.user.toString();
            }
          },
          message: 'the maker cannot be the approver',
        },
      },
      approved: {
        type: Boolean,
        allowNull: true,
        required: false,
        default: null,
        validate: {
          validator: function (v) {
            if (!this.approver || (this.approver.user === null && v === null)) {
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
            if (!this.approver || (this.approver.user === null && v === null)) {
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

scorecardSchema.virtual('customer.internalNetworthLimitRatio').get(function () {
  return `${+this.customer.networth.value / +this.customer.proposedLimit}`;
});

scorecardSchema.virtual('customer.totalNetworthLimitRatio').get(function () {
  return `${
    +this.customer.networth.value / +this.customer.bcsb.totalExistingLimit
  }`;
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
