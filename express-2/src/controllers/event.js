import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';

class Event {
  constructor() {

  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    const query = {};

    models.Event.find(query, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.json(objs);
    });
  }

  static getBySSCC(req, res, next) {
    helpers.LOGGER.info("getBySSCC - '/:sscc' - called");

    const query = {};

    if (req.params.sscc) {
      query.SSCC = req.params.sscc;
    }

    models.Shipment.findOne(query, (err, obj) => {
      if (err) {
        next(boom.badRequest(err));
      }

      if (obj) {
        return res.json(obj);
      }
      next(boom.notFound('Shipment not found'));
    });
  }

  static create(req, res) {
    helpers.LOGGER.info("post - '/' - called");
    const obj = new models.Event(req.body);

    helpers.LOGGER.info(`object modeled: ${JSON.stringify(obj)}`);
    obj.save((err, o) => {
      if (err) {
        next(boom.badImplementation(err));
      } 
      
      return res.status(201).json(o);
    });
  }
}

export default Event;