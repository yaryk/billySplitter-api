import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import config from '../../../config/index';
import { User } from '../user/user.model';
import { ClientErrors, createClientResponse } from '../../modules';

const jwtSecret = config.secrets.JWT_SECRET;

/*
*  Function for validate token and attach to req.user
* */
const checkToken = expressJwt({ secret: jwtSecret });

/*
*  Attaching user to the request
* */
export const getFreshUser = () => (req, res, next) => User.findById(req.user.id)
  .then((user) => {
    if (!user) {
      res.status(401).json(ClientErrors.AUTH_ERROR.UNAUTHORIZED);
    } else {
      // update req.user with fresh user from
      req.user = user;
      next();
    }
  })
  .catch(error => next(error));

// for login
export const verifyUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400)
          .json(createClientResponse(ClientErrors.AUTH_ERROR.USER_NOT_FOUND));
      } else {
        user.authenticate(password)
          .then((isValid) => {
            if (!isValid) {
              res.status(400).send(createClientResponse(ClientErrors.AUTH_ERROR.WRONG_PASS));
            } else {
              req.user = user;
              next();
            }
          });
      }
    })
    .catch(error => next(error));
};

/*
*  Function for creating token
* */
export const signToken = id => jwt.sign(
  { id },
  jwtSecret,
  { expiresIn: config.expireTime }
);

export const signin = (req, res) => {
  // req.user will be there from the middleware
  const token = signToken(req.user.id);
  res.status(200);
  res.json(createClientResponse({ token }));
};

export const singup = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(409); // conflict
        res.json(createClientResponse(null, ClientErrors.AUTH_ERROR.USER_EMAIL_EXSIST));
      } else {
        new User(req.body)
          .save()
          .then((createdUser) => {
            res.status(201);
            res.json(createClientResponse(createdUser));
          })
          .catch((err) => {
            console.log(err);
            next(new Error(err));
          });
      }
    })
    .catch((err) => {
      console.log(err);
      next(new Error(err));
    });
};

export const protectRoute = [checkToken, getFreshUser()];
