const express = require('express');
const morgan = require('morgan');

const customerRouter = require('./routes/customerRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`Request made at ${req.requestTime}`);
  next();
});

//Routes
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/users', userRouter);

//Perhaps add link to docs in message later.
app.all('*', (req, res, next) => {
  /* res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server.`,
  }); */
  const err = new Error(`Can't find ${req.originalUrl} on this server.`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
