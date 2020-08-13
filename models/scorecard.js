/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const mongoose = require('mongoose');
const User = require('./user');

const { isAmount } = '../util/validators.js';

const Schema = mongoose.Schema;

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
        enum: ['male', 'female', 'other'],
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
        ],
      },
      nationalityType: {
        type: String,
        required: false,
        allowNull: true,
        default: null,
        enum: ['omani', 'gcc', 'expat'],
      },
      networth: {
        value: {
          type: String,
          required: false,
          allowNull: false,
          default: '0.000',
          validate: {
            validator: (v) => isAmount(v),
            message: (value) => `${value.value} is not a valid amount`,
          },
        },
        position: {
          type: String,
          required: false,
          allowNull: false,
          default: 'not available',
          enum: [
            'not available',
            'less than 1 million OMR',
            '1-2.5 million OMR',
            '2.5-5 million OMR',
            'more than 5 million OMR',
          ],
        },
        document: {
          type: String,
          required: false,
          allowNull: false,
          default: 'no information',
          enum: [
            'auditor A',
            'auditor B',
            'auditor C',
            'self declared',
            'no information',
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
        default: 'unidentified cashflow',
        enum: [
          'assigned cash flow above 150%',
          'assigned cash flow 100%-150%',
          'assigned cash flow below 100%',
          'identified cash flow not assigned',
          'unidentified cashflow',
        ],
      },
      proposedLimit: {
        type: String,
        allowNull: true,
        required: false,
        default: null,
      },
      bcsb: {
        totalExistingLimit: {
          type: String,
          allowNull: true,
          required: false,
          default: null,
        },
        status: {
          type: String,
          allowNull: true,
          required: false,
          default: null,
        },
        relatedCompaniesStatus: {
          type: String,
          allowNull: true,
          required: false,
          default: null,
        },
      },
      dpdOneYear: {
        type: Number,
        allowNull: true,
        required: false,
        default: null,
      },
      relationYears: {
        type: Number,
        allowNull: true,
        required: false,
        default: null,
      },
      businessYears: {
        type: Number,
        allowNull: true,
        required: false,
        default: null,
      },
      facilities: [
        {
          product: {
            type: String,
            allowNull: true,
            required: false,
            default: null,
          },
          limit: {
            type: Number,
            allowNull: true,
            required: false,
            default: null,
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
              enum: [
                '0',
                '25%-50%',
                '50%-75%',
                '75%-100%',
                'greater than 100%',
              ],
            },
            bankGuaranteeTwo: {
              type: String,
              allowNull: false,
              required: false,
              default: '0',
              enum: [
                '0',
                '25%-50%',
                '50%-75%',
                '75%-100%',
                'greater than 100%',
              ],
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
              enum: [
                '0',
                '75%-100%',
                '100%-150%',
                '150%-200%',
                'greater than 200%',
              ],
            },
            freeholdSecondDegree: {
              type: String,
              allowNull: false,
              required: false,
              default: '0',
              enum: [
                '0',
                '100%-150%',
                '150%-200%',
                '200%-250%',
                'greater than 250%',
              ],
            },
          },
        },
      ],
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    makerSubmit: {
      type: Boolean,
      allowNull: true,
      required: false,
      default: null,
    },
    makerSubmitDate: {
      type: Date,
      required: false,
      allowNull: true,
      default: null,
    },
    approver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approved: {
      type: Boolean,
      allowNull: true,
      required: false,
      default: null,
    },
    approverSubmitDate: {
      type: Date,
      required: false,
      allowNull: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scorecard', scorecardSchema);
