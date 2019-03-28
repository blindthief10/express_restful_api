const express = require('express');
const orders = require('../orders.json');
const ordersRoute = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kostas.diakogiannis@digitalcareerinstitute.org',
    pass: process.env.PASSWORD_EMAIL
  }
})

ordersRoute.get('/', (req, res, next) => {
  res.status(200).json({
    data: orders,
    message: 'This is the response with all orders'
  });
})

ordersRoute.get('/:firma', (req, res, next) => {
  const firma = req.params.firma;
  const filteredByFirma = orders.filter(product => product.productsFirma.toLowerCase() === firma.toLowerCase());
  if (!filteredByFirma.length) {
    const error = new Error('The company you set doesnt exist!');
    error.status = 404;
    next(error);
  } else {
    res.status(200).send(filteredByFirma);
  }
})

ordersRoute.post('/', (req, res, next) => {
  orders.push(req.body);

  const emailOptions = {
    from: 'kostas.diakogiannis@digitalcareerinstitute.org',
    to: req.body.email,
    subject: 'Simple email sending with nodemailer',
    html: '<h1>Sending email with node was never simpler!</h1>'
  }

  emailTransporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  })

  res.status(201).send('You have added a new order!');
})

ordersRoute.use('/:id', (req, res, next) => {
  req.productFoundIndex = orders.findIndex(product => product.productId === req.params.id);

  if (req.productFoundIndex !== -1) {
    next();
  } else {
    const error = new Error(`That product with id ${req.params.id} does not exist!`);
    error.status = 404;
    next(error);
  }
})

ordersRoute.delete('/:id', (req, res, next) => {
    orders.splice(req.productFoundIndex, 1);
    res.status(202).send('The delete operation was succesful')
})

ordersRoute.put('/orders/:id', (req, res, next) => {
    orders[req.productFoundIndex] = req.body;
    res.status(202).send('The product was updated');
})


module.exports = ordersRoute;
