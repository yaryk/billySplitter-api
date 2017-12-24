import express from 'express';
import { userRouter } from './resources/user';
import { apiErrorHandler } from './modules/errors/errorHandler';

export const restRouter = express.Router();

restRouter.use('/user', userRouter);

restRouter.use(apiErrorHandler);
