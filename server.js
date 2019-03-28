const express = require('express');
const app = express(); // Server is created
const ordersRoute = require('./routes/orderRoutes');
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/orders', ordersRoute);

// dedicated error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({
    message: err.message
  })
})


app.listen(port);
console.log('Server is listening to port 4000');
