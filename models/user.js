/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      primaryKey: true,
      allowNull: false,
      auto: true,
    },
    username: {
      type: String,
      allowNull: false,
      unique: true,
      required: [true, 'username required'],
    },
    roles: {
      type: Array,
      allowNull: false,
      required: true,
      validate: {
        validator: (v) => {
          if (Array.isArray(v) && v.length) {
            return true;
          } else {
            return false;
          }
        },
        message: (props) => `[${props.value}] are not valid roles`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
