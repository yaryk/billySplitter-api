import express from 'express';

import { userRouter } from './resources/user';
import { authRouter } from './resources/auth';
import { apiErrorHandler } from './modules/errors/errorHandler';

export const restRouter = express.Router();

restRouter.use('/user', userRouter);

restRouter.use('/auth', authRouter);

restRouter.use(apiErrorHandler);
