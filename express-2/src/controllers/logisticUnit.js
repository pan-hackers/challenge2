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

  static attachTU(req, res, next) {
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
              helpers.LOGGER.info(`--> trade unit not found`);
              next(boom.notFound('TradeUnit not found'));
            }
          });
        }
      } else {
        next(boom.notFound('LogisticUnit not found'));
      }
    });
  }

  static attachShipment(req, res, next) {
    helpers.LOGGER.info("post - '/:gtin/shipment' - called");
  
    const query = {};
  
    if (req.params.gtin) {
      query.GTIN = req.params.gtin;
    }
  
    models.LogisticUnit.findOne(query, (err, lu) => {
      if (err) {
        next(boom.badRequest(err));
      }
  
      if (lu) {
        if (req.body.SSCC) {
          helpers.LOGGER.debug(`--> ${req.body.SSCC}`);

          const query1 = {};
          query1.SSCC = req.body.SSCC;
  
          models.Shipment.findOne(query1, (err, s) => {
            if (err) {
              next(boom.badRequest(err));
            }
            helpers.LOGGER.debug(`--> ${s}`);
            if (s) {
              lu.shipment = s;
              lu.save((err, t) => {
                if (err) {
                  next(boom.badRequest(err));
                }
                helpers.LOGGER.debug(`--> ${t}`);
  
                return res.status(201).json(t);
              });
            } else {
              helpers.LOGGER.debug(`--> shipment not found`);
              next(boom.notFound('Shipment not found'));
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