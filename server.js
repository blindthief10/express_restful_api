const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const morgan = require('morgan');
const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/users';

const connectToMongo = async () => {

  try {
    console.log('Seconds before connecting');
    await mongoose.connect(databaseUrl, {useNewUrlParser: true});
    console.log('Database connected');
  }catch (e) {
    next(e);
  }

}

connectToMongo();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/users', userRoute);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({message: err.message})
})

app.listen(4000);
console.log('Server is listening in port 4000');
