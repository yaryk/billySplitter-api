import merge from 'lodash.merge';
import mongoose from 'mongoose';
import { createClientResponse } from './helpers/helpers';
import { ClientErrors } from './errors/client-errors';

export const controllers = {
  createOne(model, body) {
    return model.create(body);
  },

  updateOne(docToUpdate, update) {
    merge(docToUpdate, update);
    return docToUpdate.save();
  },

  deleteOne(docToDelete) {
    return docToDelete.remove();
  },

  getOne(docToGet) {
    return Promise.resolve(docToGet);
  },

  getAll(model) {
    return model.find({});
  },

  findByParam(model, id) {
    return model.findById(id);
  }
};

export const createOne = model => (req, res, next) => controllers.createOne(model, req.body)
  .then(doc => res.status(201).json(createClientResponse(doc, null)))
  .catch(error => next(error));

export const updateOne = () => async (req, res, next) => {
  const docToUpdate = req.docFromId;
  const update = req.body;

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(createClientResponse(doc, null)))
    .catch(error => next(error));
};

export const deleteOne = () => (req, res, next) => controllers.deleteOne(req.docFromId)
  .then(doc => res.status(201).json(createClientResponse(doc, null)))
  .catch(error => next(error));

export const getOne = () => (req, res, next) => controllers.getOne(req.docToUpdate)
  .then(doc => res.status(200).json(createClientResponse(doc, null)))
  .catch(error => next(error));

export const getAll = model => (req, res, next) => controllers.getAll(model)
  .then(docs => res.json(createClientResponse(docs, null)))
  .catch(error => next(error));

export const findByParam = model => (req, res, next, id) => controllers.findByParam(model, id)
  .then((doc) => {
    if (!doc) {
      res.status(404);
      res.json(createClientResponse(null, ClientErrors.EL_NOT_FOUND));
    }

    res.json(createClientResponse(doc, null));
  })
  .catch((err) => {
    if (err.message instanceof mongoose.Error.CastError) {
      res.status(404);
      res.json(createClientResponse(null, ClientErrors.EL_NOT_FOUND));
    } else {
      next(err);
    }
  });

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  };

  return { ...defaults, ...overrides };
};
