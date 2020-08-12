/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const mongoose = require('mongoose');

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
        enum: ['male', 'female', 'other'],
      },
      ageRange: {
        type: String,
        required: false,
        allowNull: true,
        enum: [
          'less than 30',
          '30-45',
          '45-55',
          '55-60',
          '65-70',
          'more than 70',
        ],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scorecard', scorecardSchema);
