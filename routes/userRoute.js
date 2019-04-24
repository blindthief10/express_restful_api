const express = require('express');
const usersRoute = express.Router();
const { check, validationResult } = require('express-validator/check');
const userModel = require('../models/userModel');
const createError = require('http-errors');
const validateUser = require('../helpers/validateUserCreate');
const {getAllUsers, getUserByUserName, updateUserByUserName, deleteUserByUserName, createUser} = require('../helpers/userRouteHelpers');

usersRoute.get('/', getAllUsers);
usersRoute.get('/:username', getUserByUserName);
usersRoute.post('/', validateUser, createUser)
usersRoute.put('/:username', updateUserByUserName);
usersRoute.delete('/:username', deleteUserByUserName);

module.exports = usersRoute;
