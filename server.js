const express = require('express');
const app = express(); // Server is created
const orders = require('./orders.json');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/orders', (req, res, next) => {
  orders.push(req.body);
  next();
})

app.use('/orders', (req, res, next) => {
  res.status(200).send(orders);
})

app.get('/orders/:firma', (req, res, next) => {
  const firma = req.params.firma; // apple, htc,
  const filteredByFirma = orders.filter(product => product.productsFirma.toLowerCase() === firma.toLowerCase());
  if (!filteredByFirma.length) {
    res.status(404).send('The company you set doesnt exist!')
  } else {
    res.status(200).send(filteredByFirma);
  }
})


app.listen(4000);
console.log('Server is listening to port 4000');
