import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';

class LogisticUnit {
  constructor() {

  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    const query = {};

    models.LogisticUnit.find(query, (err, cu) => {
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

    models.LogisticUnit.findOne(query, (err, cu) => {
      if (err) {
        next(boom.badRequest(err));
      }

      if (cu) {
        return res.json(cu);
      }
      next(boom.notFound('LogisticUnit not found'));
    });
  }

  static create(req, res, next) {
    helpers.LOGGER.info("post - '/' - called");

    const tu = new models.LogisticUnit(req.body);

    helpers.LOGGER.info(`tu modeled: ${JSON.stringify(tu)}`);

    tu.save((err, t) => {
      if (err) {
        next(boom.badImplementation(err));
      }

      return res.status(201).json(t);
    });
  }

  static attachLU(req, res, next) {
    helpers.LOGGER.info("post - '/:gtin' - called");

    const query = {};

    if (req.params.gtin) {
      query.GTIN = req.params.gtin;
    }

    models.LogisticUnit.findOne(query, (err, tu) => {
      if (err) {
        next(boom.badRequest(err));
      }

      helpers.LOGGER.info(`--> ${query.GTIN}`);

      if (tu) {
        if (req.body.GTIN) {
          query.GTIN = req.body.GTIN;

          models.TradeUnit.findOne(query, (err, cu) => {
            if (err) {
              next(boom.badRequest(err));
            }

            if (cu) {
              tu.tradeUnits.push(cu);
              tu.save((err, t) => {
                if (err) {
                  next(boom.badRequest(err));
                }
                helpers.LOGGER.info(`--> ${t}`);

                return res.status(201).json(t);
              });
            } else {
              helpers.LOGGER.info(`--> consumable unit not found`);
              next(boom.notFound('ConsumableUnit not found'));
            }
          });
        }
      } else {
        next(boom.notFound('LogisticUnit not found'));
      }
    });
  }
}

export default LogisticUnit;