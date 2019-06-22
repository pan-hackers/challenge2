import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';

class ConsumableUnit {
  constructor() {

  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    const query = {};

    models.ConsumableUnit.find(query, (err, cu) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.json(cu);
    });
  }

  static getByGTIN(req, res, next) {
    helpers.LOGGER.info("getByGTIN - '/:gtin' - called");

    const query = {};

    if (req.params.gtin) {
      query.GTIN = req.params.gtin;
    }

    models.ConsumableUnit.findOne(query, (err, cu) => {
      if (err) {
        next(boom.badRequest(err));
      }

      if (cu) {
        return res.json(cu);
      }
      next(boom.notFound('ConsumableUnit not found'));
    });
  }

  static create(req, res, next) {
    helpers.LOGGER.info("post - '/' - called");
    const cu = new models.ConsumableUnit(req.body);

    helpers.LOGGER.info(`cu modeled: ${JSON.stringify(cu)}`);

    cu.save((err, c) => {
      if (err) {
        next(boom.badImplementation(err));
      } 
      
      return res.status(201).json(c);
    });
  }
}

export default ConsumableUnit;