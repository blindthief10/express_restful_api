const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const morgan = require('morgan');
const connectToMongo = require('./helpers/mongoHelpers');
const errorHandler = require('./helpers/errorHandler');

connectToMongo();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/users', userRoute);

app.use(errorHandler);

app.listen(4000);
console.log('Server is listening in port 4000');
