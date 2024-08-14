const globalErrorHandler = (err, req, res, next) => {
  let code = err.statusCode ? err.statusCode : 500;
  let message = err.message;

  console.log('error', err);

  if (err.name === 'SequelizeUniqueConstraintError') {
    code = 409;
    message = err.errors[0].message;
  }

  res.status(code).json({
    statusCode: code,
    status: 'error',
    message,
  });
};

export default globalErrorHandler;
