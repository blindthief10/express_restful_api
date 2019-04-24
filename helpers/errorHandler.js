const errorHandler = (err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({message: err.message})
}

module.exports = errorHandler;
