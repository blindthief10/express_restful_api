const express = require('express');
const app = express(); // Server is created
const orders = require('./orders.json');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/orders', (req, res, next) => {
  next();
})

app.post('/orders', (req, res, next) => {
  orders.push(req.body);
  next();
})

app.use('/orders', (req, res, next) => {
  res.status(200).send(orders);
})

app.listen(4000);
console.log('Server is listening to port 4000');
