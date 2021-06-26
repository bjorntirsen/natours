class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    //This property is to know if the error is operational
    //as opposed to programmatic
    this.isOperational = true;

    Error.captureStackTrace(this, this.constuctor);
  }
}

module.exports = AppError;
