const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const customerRouter = require('./routes/customerRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Global Middleware
// Set security HTTP headers
app.use(helmet());

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit rate of requests made
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitazion against NoSQL data injection
app.use(mongoSanitize());

// Data sanitazion against XSS
app.use(xss());

// Serving static files
app.use(express.static(`${__dirname}/public`));

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
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

//Error handler
app.use(globalErrorHandler);

module.exports = app;
