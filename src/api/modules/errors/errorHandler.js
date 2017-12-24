import { createClientResponse } from '../helpers';
import { ClientErrors } from './client-errors';

/*
*  This function for creating error response to client
* */
export const apiErrorHandler = (error, req, res, next) => {
  const errorDetails = {
    message: error.message,
    status: error.status || 500
  };
  res.status(error.status || 500);
  return res.json(createClientResponse(null, errorDetails));
};

/*
* Handling not found requests
* */
export const notFound = (req, res) => {
  res.status(404);
  res.json(createClientResponse(null, ClientErrors.NOT_FOUND));
};

