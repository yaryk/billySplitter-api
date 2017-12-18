/*
*  This function for creating error response to client
* */
export const apiErrorHandler = (error, req, res, next) => {
  const isNotFound = error.message.indexOf('not found');
  const isCastError = error.message.indexOf('Cast to ObjectId failed');

  if (isNotFound !== -1 || isCastError !== -1) {
    return next();
  }

  const errorDetails = {
    message: error.message,
    status: error.status || 500,
    errorStack: error.stack,
  };
  res.status(error.status || 500);
  return res.json(errorDetails);
};
/*
* Handling not found request
* */
export const notFound = (req, res) => {
  res.status(404);
  res.send('Not found');
};

