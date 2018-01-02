import express from 'express';

import { singup, verifyUser, signin } from './auth.controller';
import { schemas, validateBody } from '../../modules/joi-validation.module';

export const authRouter = express.Router();

authRouter.route('/register')
  .post(
    validateBody(schemas.registrationSchema),
    singup
  );

authRouter.route('/login')
  .post(
    validateBody(schemas.loginSchema),
    verifyUser,
    signin
  );
