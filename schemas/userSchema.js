const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
}, {versionKey: false})

module.exports = userSchema;
