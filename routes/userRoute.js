const express = require('express');
const users = require('../users.json');
const usersRoute = express.Router();
const { check, validationResult } = require('express-validator/check');

usersRoute.get('/', (req, res, next) => {
  res.status(200).send(users);
})

usersRoute.get('/:username', (req, res, next) => {
  const user = users.find(user => user.userName === req.params.username);

  if (user) {
    res.status(200).send(user);
  } else {
    const errorCase = new Error(`The user ${req.params.username} was not found!`);
    errorCase.status = 404;
    next(errorCase);
  }
})

usersRoute.post('/', [
  check(['firstName', 'lastName', 'password', 'email', 'userName']).exists().not().isEmpty().withMessage('All fields are required!'),
  check('email').trim().isEmail().normalizeEmail().withMessage('The email you have passed is invalid'),
  check('password').trim().isLength({min: 4, max: 20}).escape().withMessage('The password field must be between 4 and 20 characters'),
  check('email').custom(emailValue => {

    const foundUserByThisEmail = users.find(user => user.email === emailValue);

    if (foundUserByThisEmail) {
      throw new Error(`A user with email address ${emailValue} already exists!`);
    }else {
      return true;
    }

  })
], (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    users.push(req.body);
    res.status(201).json({
      message: 'The user was created succesfully!'
    });
  }else {
    res.status(422).json({
      errors: errors.array()
    })
  }

})

usersRoute.use('/:username', (req, res, next) => {
  req.usersIndex = users.findIndex(user => user.userName === req.params.username);

  if (req.usersIndex !== -1) {
    next();
  }else {
    const errorCase = new Error(`The user ${req.params.username} could not be found!!`);
    errorCase.status = 404;
    next(errorCase);
  }
})

usersRoute.put('/:username', (req, res, next) => {
    users[req.usersIndex] = req.body;
    res.status(200).send('Update succesful!');
})

usersRoute.delete('/:username', (req, res, next) => {
    users.splice(req.usersIndex, 1);
    res.status(202).send('Resource was deleted succesfully!');
})

module.exports = usersRoute;
