/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scaleSchema = new Schema(
  {
    orrScale: [
      {
        _id: {
          type: String,
          required: true,
          allowNull: false,
        },
        upper: {
          type: Number,
          required: true,
          allowNull: false,
        },
        lower: {
          type: Number,
          required: true,
          allowNull: false,
        },
        pd: {
          type: Number,
          required: true,
          allowNull: false,
        },
        orrDesc: {
          type: String,
          required: true,
          allowNull: false,
        },
      },
    ],
    frrScale: [
      {
        _id: {
          type: String,
          required: true,
          allowNull: false,
        },
        upper: {
          type: Number,
          required: true,
          allowNull: false,
        },
        lower: {
          type: Number,
          required: true,
          allowNull: false,
        },
        lgd: {
          type: String,
          required: true,
          allowNull: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scale', scaleSchema);
