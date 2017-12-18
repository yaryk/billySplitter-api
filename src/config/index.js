/* global process */

import merge from 'lodash.merge';

import devConf from './dev';
import testConf from './testing';
import prodConf from './prod';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = process.env.NODE_ENV;

const baseConfig = {
  port: process.env.PORT || 8080,
  secrets: {
    JWT_SECRET: process.env.JWT_SECRET
  },
  db: {}
};

let envConfig = {};

switch (env) {
  case 'development':
  case 'dev':
    envConfig = devConf;
    break;
  case 'test':
  case 'testing':
    envConfig = testConf;
    break;
  case 'prod':
  case 'production':
    envConfig = prodConf;
    break;
  default:
    envConfig = devConf;
}


export default merge(baseConfig, envConfig);
