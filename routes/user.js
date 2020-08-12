/**
 * Project: wsc-backend
 * Description: alizz islamic bank wealth management scorecard backend.
 * Copyright (C) 2020 alizz islamic Bank. All Rights Reserved.
 * Author: Revanth Nemani <revanth.nemani@alizzislamic.com>
 */

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

// POST user request
router.post('/users', userController.postUser);

// GET one user
router.get('/users/:username', userController.getUser);

// GET all users
router.get('/users', userController.getUsers);

// Patch a user
router.patch('/users', userController.patchUser);

// Delete a user
router.delete('/users/:username', userController.deleteUser);

module.exports = router;
