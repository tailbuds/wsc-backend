/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const mongoose = require('mongoose');

const User = require('../models/user');

// POST create user
exports.postUser = (req, res, next) => {
  const request = req.body;
  const user = new User({
    username: req.body.username,

    roles: req.body.roles,
  });
  user
    .save()
    .then(() => res.status(201).json({ success: 1, request: request }))
    .catch((err) => {
      if (err.code == 11000) {
        res.status(422).json({
          success: 0,
          message: 'username already exists',
          reason: err.message,
        });
      } else {
        res.status(400).json({
          success: 0,
          reason: err.message,
        });
      }
    });
};

// GET user
exports.getUser = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json({ error: 'notFound' });
    });
};

// GET all users
exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(404).json({ error: 'notFound' });
    });
};

// PATCH user roles
exports.patchUser = (req, res, next) => {
  const request = req.body;
  User.findOneAndUpdate(
    { username: req.body.username },
    { roles: req.body.roles },
    { useFindAndModify: false }
  )
    .then((user) => {
      res.status(200).json({
        success: 1,
        preUpdate: { username: user.username, roles: user.roles },
        postUpdate: { username: user.username, roles: req.body.roles },
      });
    })
    .catch((err) => {
      res.status(400).json({ success: 0, reason: err.message });
    });
};

// DELETE user
exports.deleteUser = (req, res, next) => {
  User.findOneAndDelete(
    { username: req.params.username },
    { useFindAndModify: false }
  )
    .then((user) => {
      res.status(200).json({
        success: 1,
        deleted: { username: user.username, roles: user.roles },
      });
    })
    .catch((err) => {
      res.status(400).json({ success: 0, reason: err.message });
    });
};
