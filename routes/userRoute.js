const express = require('express');
const users = require('../users.json');
const usersRoute = express.Router();

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

usersRoute.post('/', (req, res, next) => {
  users.push(req.body);
  res.status(201).send('A new user was created');
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
