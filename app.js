const express = require('express');
const morgan = require('morgan');

const customerRouter = require('./routes/customerRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`Request made at ${req.requestTime}`);
  next();
});

//Routes
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/users', userRouter);

//Server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
