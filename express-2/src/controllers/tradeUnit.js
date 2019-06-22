import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';

class TradeUnit {
  constructor() {

  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    const query = {};

    models.TradeUnit.find(query, (err, cu) => {
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

    models.TradeUnit.findOne(query, (err, cu) => {
      if (err) {
        next(boom.badRequest(err));
      }

      if (cu) {
        return res.json(cu);
      }
      next(boom.notFound('TradeUnit not found'));
    });
  }

  static create(req, res, next) {
    helpers.LOGGER.info("post - '/' - called");

    const tu = new models.TradeUnit(req.body);

    helpers.LOGGER.info(`tu modeled: ${JSON.stringify(tu)}`);

    tu.save((err, t) => {
      if (err) {
        next(boom.badImplementation(err));
      }

      return res.status(201).json(t);
    });
  }

  // router.put('/:gtin', controllers.tradeUnit.modify);
  static attachCU(req, res, next) {
    helpers.LOGGER.info("post - '/:gtin' - called");

    const query = {};

    if (req.params.gtin) {
      query.GTIN = req.params.gtin;
    }

    models.TradeUnit.findOne(query, (err, tu) => {
      if (err) {
        next(boom.badRequest(err));
      }

      helpers.LOGGER.info(`--> ${query.GTIN}`);

      if (tu) {
        if (req.body.GTIN) {
          query.GTIN = req.body.GTIN;

          models.ConsumableUnit.findOne(query, (err, cu) => {
            if (err) {
              next(boom.badRequest(err));
            }

            if (cu) {
              tu.consumableUnits.push(cu);
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
        next(boom.notFound('TradeUnit not found'));
      }
    });
  }

  static attachShipment(req, res, next) {
    helpers.LOGGER.info("post - '/:gtin/shipment' - called");
  
    const query = {};
  
    if (req.params.gtin) {
      query.GTIN = req.params.gtin;
    }
  
    models.TradeUnit.findOne(query, (err, tu) => {
      if (err) {
        next(boom.badRequest(err));
      }
  
      if (tu) {
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
              tu.shipment = s;
              tu.save((err, t) => {
                if (err) {
                  next(boom.badRequest(err));
                }
                helpers.LOGGER.info(`--> ${t}`);
  
                return res.status(201).json(t);
              });
            } else {
              helpers.LOGGER.info(`--> shipment not found`);
              next(boom.notFound('Shipment not found'));
            }
          });
        }
      } else {
        next(boom.notFound('TradeUnit not found'));
      }
    });
  }
  
}

export default TradeUnit;