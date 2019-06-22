import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';

class Milestone {
  constructor() {

  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    const query = {};

    models.Milestone.find(query, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.json(objs);
    });
  }

  static create(req, res) {
    helpers.LOGGER.info("post - '/' - called");
    const obj = new models.Milestone(req.body);

    helpers.LOGGER.info(`object modeled: ${JSON.stringify(obj)}`);
    obj.save((err, o) => {
      if (err) {
        next(boom.badImplementation(err));
      } 
      
      return res.status(201).json(o);
    });
  }
}

export default Milestone;