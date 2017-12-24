import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = global.Promise;

const connect = () => mongoose.connect(config.db.url, {
  useMongoClient: true
});

export default connect;
