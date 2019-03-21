const express = require('express');
const app = express(); // Server is created
const orders = require('./orders.json');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.get('/orders', (req, res, next) => {
  res.status(200).json({
    data: orders,
    message: 'This is the response with all orders'
  });
})

app.post('/orders', (req, res, next) => {
  orders.push(req.body);
  res.status(201).send('You have added a new order!');
})

app.use('/orders/:id', (req, res, next) => {
  req.productFoundIndex = orders.findIndex(product => product.productId === req.params.id);

  if (req.productFoundIndex !== -1) {
    next();
  } else {
    const error = new Error(`That product with id ${req.params.id} does not exist!`);
    error.status = 404;
    next(error);
  }
})

app.delete('/orders/:id', (req, res, next) => {
    orders.splice(req.productFoundIndex, 1);
    res.status(202).send('The delete operation was succesful')
})

app.put('/orders/:id', (req, res, next) => {
    orders[req.productFoundIndex] = req.body;
    res.status(202).send('The product was updated');
})

app.get('/orders/:firma', (req, res, next) => {
  const firma = req.params.firma; // apple, htc,
  const filteredByFirma = orders.filter(product => product.productsFirma.toLowerCase() === firma.toLowerCase());
  if (!filteredByFirma.length) {
    const error = new Error('The company you set doesnt exist!');
    error.status = 404;
    next(error);
  } else {
    res.status(200).send(filteredByFirma);
  }
})

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({
    message: err.message
  })
})


app.listen(4000);
console.log('Server is listening to port 4000');
