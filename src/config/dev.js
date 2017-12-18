/* global process */
const config = {
  expireTime: '30d',
  db: {
    url: process.env.DB_DEV_URL
  }
};

export default config;
