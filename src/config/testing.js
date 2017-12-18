/* global process */

const config = {
  expireTime: '30d',
  port: 8081,
  db: {
    url: process.env.DB_TEST_URL
  }
};

export default config;
