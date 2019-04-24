const { check } = require('express-validator/check');

const validateCreationUser = [
  check(['firstName', 'lastName', 'password', 'email', 'userName']).exists().not().isEmpty().withMessage('All fields are required!'),
  check('email').trim().isEmail().normalizeEmail().withMessage('The email you have passed is invalid'),
  check('password').trim().isLength({min: 4, max: 20}).escape().withMessage('The password field must be between 4 and 20 characters')
];

module.exports = validateCreationUser;
