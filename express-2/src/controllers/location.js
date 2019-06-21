import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';

class Location {
  constructor() {

  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    const query = {};

    models.Location.find(query, (err, locations) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.json(locations);
    });
  }

  static getByGLN(req, res, next) {
    helpers.LOGGER.info("getByGLN - '/:gln' - called");

    const query = {};

    if (req.params.gln) {
      query.GLN = req.params.gln;
    }

    models.Location.findOne(query, (err, location) => {
      if (err) {
        next(boom.badRequest(err));
      }

      if (location) {
        return res.json(location);
      }
      next(boom.notFound('Location not found'));
    });
  }

  static create(req, res) {
    helpers.LOGGER.info("post - '/' - called");
    const location = new models.Location(req.body);

    helpers.LOGGER.info(`location modeled: ${JSON.stringify(location)}`);

    models.Company
    .findById(req.body.company).exec((err, comp) => {
      if (err) {
        next(boom.badImplementation(err));
      }

      location.company = comp;

      location.save((err, c) => {
        if (err) {
          next(boom.badImplementation(err));
        } 
        
        return res.status(201).json(c);
      });
    });
  }
}

export default Location;