import mongoose from 'mongoose';
import config from '../src/config';

mongoose.Promise = global.Promise;

export const removeModel = (modelName) => {
  const model = mongoose.model(modelName);
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve();
    }
    return model.remove((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const dropDb = () => mongoose.connect(config.db.url, {
  useMongoClient: true,
})
  .then(() => Promise.all(mongoose.modelNames().map(removeModel)));
