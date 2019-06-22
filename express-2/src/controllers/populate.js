import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';
import datas from '../data';
import controllers from '.';

class Populate {
  constructor() {

  }

  static populateCompanies(req, res, next) {
    helpers.LOGGER.info("populateCompanies - '/' - called");

    helpers.LOGGER.info(`datas.companyData - ${JSON.stringify(datas.companyData)}`);

    models.Company.insertMany(datas.companyData, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.status(201).json(objs);
    });
  }

  static populateLocations(req, res, next) {
    helpers.LOGGER.info("populateLocations - '/' - called");

    helpers.LOGGER.info(`datas.locationData - ${JSON.stringify(datas.locationData)}`);

    models.Location.insertMany(datas.locationData, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.status(201).json(objs);
    });
  }

  static populateConsumableUnits(req, res, next) {
    helpers.LOGGER.info("populateConsumableUnits - '/' - called");

    helpers.LOGGER.info(`datas.consumableUnitData - ${JSON.stringify(datas.consumableUnitData)}`);

    models.ConsumableUnit.insertMany(datas.consumableUnitData, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.status(201).json(objs);
    });
  }

  static populateMilestoneARR(req, res, next) {
    helpers.LOGGER.info("populateMilestoneARR - '/' - called");

    helpers.LOGGER.debug(`datas.milestoneDataARR - ${JSON.stringify(datas.milestoneDataARR)}`);

    const query = {}
    if (req.params.id) {
      query._id = req.params.id;
    }

    models.Shipment.findOne(query, (err, s) => {
      if (err) {
        next(boom.notFound(err));
      }
      models.Milestone.insertMany(datas.milestoneDataARR, (err, objs) => {
        if (err) {
          next(boom.badRequest(err));
        }

        for (let j = 0; j < objs.length; j++) {
          models.LogisticUnit.findById("5d0e29a912c93a513833048a")
            .populate({
              path: 'tradeUnits',
              model: 'TradeUnit',
              populate: {
                path: 'consumableUnits',
                model: 'ConsumableUnit'
              }
            })
            .exec(async (err, lu) => {
              if (err) {
                next(boom.notFound(err));
              }

              for (let i = 0; i < 10; i++) {
                // create the event
                const ev = new models.Event({
                  what: "76333339800001",
                  when: new Date(),
                  where: "7644444000002",
                  why: "pallet unloaded",
                  action: "OBSERVE",
                  temperature: Math.floor(Math.random() * Math.floor(50)),
                  logisticUnit: lu
                });

                await ev.save();
                objs[j].events.push(ev);
              }

              objs[j].shipment = s;

              helpers.LOGGER.debug(`After saving the shipment`);

              // time to save the milestone
              await objs[j].save();

              helpers.LOGGER.debug(`--> ${JSON.stringify(s._id)}`);

              controllers.blockchain.createMilestone1(JSON.stringify(objs[j]), s._id);

              // Now I attach the milsetones to the shipment and save it
              s.milestones.push(objs[j]);
              await s.save();
            });
        }

        return res.status(201).json({});
      });
    });
  }

  static populateMilestoneDEP(req, res, next) {
    helpers.LOGGER.info("populateMilestoneDEP - '/' - called");

    helpers.LOGGER.debug(`datas.milestoneDataDEP - ${JSON.stringify(datas.milestoneDataDEP)}`);

    const query = {}
    if (req.params.id) {
      query._id = req.params.id;
    }

    models.Shipment.findOne(query, (err, s) => {
      if (err) {
        next(boom.notFound(err));
      }
      models.Milestone.insertMany(datas.milestoneDataDEP, (err, objs) => {
        if (err) {
          next(boom.badRequest(err));
        }

        for (let j = 0; j < objs.length; j++) {
          models.LogisticUnit
            .findById("5d0e29a912c93a513833048a")
            .populate({
              path: 'tradeUnits',
              model: 'TradeUnit',
              populate: {
                path: 'consumableUnits',
                model: 'ConsumableUnit'
              }
            })
            .exec(async (err, lu) => {
              if (err) {
                next(boom.notFound(err));
              }

              for (let i = 0; i < 10; i++) {
                // create the event
                const ev = new models.Event({
                  what: "76333339800001",
                  when: new Date(),
                  where: "7644444000002",
                  why: "pallet loaded",
                  action: "OBSERVE",
                  temperature: Math.floor(Math.random() * Math.floor(50)),
                  logisticUnit: lu
                });

                await ev.save();
                objs[j].events.push(ev);
              }

              objs[j].shipment = s;

              helpers.LOGGER.debug(`After saving the shipment`);

              // time to save the milestone
              await objs[j].save();

              helpers.LOGGER.debug(`--> QQQ ${JSON.stringify(objs[j])}`);

              controllers.blockchain.createMilestone1(JSON.stringify(objs[j]), s._id);

              // Now I attach the milsetones to the shipment and save it
              s.milestones.push(objs[j]);
              await s.save();
            });
        }

        return res.status(201).json({});
      });
    });
  }

  static populateMilestonePOD(req, res, next) {
    helpers.LOGGER.info("populateMilestonePOD - '/' - called");

    helpers.LOGGER.debug(`datas.milestoneDataPOD - ${JSON.stringify(datas.milestoneDataPOD)}`);

    const query = {}
    if (req.params.id) {
      query._id = req.params.id;
    }

    models.Shipment.findOne(query, (err, s) => {
      if (err) {
        next(boom.notFound(err));
      }
      models.Milestone.insertMany(datas.milestoneDataPOD, (err, objs) => {
        if (err) {
          next(boom.badRequest(err));
        }

        for (let j = 0; j < objs.length; j++) {
          models.LogisticUnit
            .findById("5d0e29a912c93a513833048a")
            .populate({
              path: 'tradeUnits',
              model: 'TradeUnit',
              populate: {
                path: 'consumableUnits',
                model: 'ConsumableUnit'
              }
            })
            .exec(async (err, lu) => {
              if (err) {
                next(boom.notFound(err));
              }

              for (let i = 0; i < 10; i++) {
                // create the event
                const ev = new models.Event({
                  what: "76333339800001",
                  when: new Date(),
                  where: "7644444000002",
                  why: "pallet delivered",
                  action: "OBSERVE",
                  temperature: Math.floor(Math.random() * Math.floor(50)),
                  logisticUnit: lu
                });

                await ev.save();
                objs[j].events.push(ev);
              }

              objs[j].shipment = s;

              helpers.LOGGER.debug(`After saving the shipment`);

              // time to save the milestone
              await objs[j].save();

              helpers.LOGGER.debug(`--> QQQ ${JSON.stringify(objs[j])}`);

              controllers.blockchain.createMilestone1(JSON.stringify(objs[j]), s._id);

              // Now I attach the milsetones to the shipment and save it
              s.milestones.push(objs[j]);
              await s.save();
            });
        }

        return res.status(201).json({});
      });
    });
  }

  static async populateMilestonePUP(req, res, next) {
    helpers.LOGGER.info("populateMilestonePUP - '/' - called");

    helpers.LOGGER.debug(`datas.milestoneDataPUP - ${JSON.stringify(datas.milestoneDataPUP)}`);
    models.Shipment.findById(req.params.id, (err, s) => {
      if (err) {
        next(boom.notFound(err));
      }

      models.Milestone.insertMany(datas.milestoneDataPUP, (err, objs) => {
        if (err) {
          next(boom.badRequest(err));
        }

        for (let j = 0; j < objs.length; j++) {
          helpers.LOGGER.debug(`--> ${JSON.stringify(datas.milestoneDataPUP)}`);
          models.LogisticUnit
            .findById("5d0e29a912c93a513833048a")
            .populate({
              path: 'tradeUnits',
              model: 'TradeUnit',
              populate: {
                path: 'consumableUnits',
                model: 'ConsumableUnit'
              }
            })
            .exec(async (err, lu) => {
              if (err) {
                next(boom.notFound(err));
              }

              for (let i = 0; i < 10; i++) {
                // create the event
                const ev = new models.Event({
                  what: "76333339800001",
                  when: new Date(),
                  where: "7633333000001",
                  why: "pallet prepared",
                  action: "OBSERVE",
                  temperature: Math.floor(Math.random() * Math.floor(50)),
                  logisticUnit: lu
                });

                await ev.save();
                objs[j].events.push(ev);
              }

              objs[j].shipment = s;

              helpers.LOGGER.debug(`After saving the shipment`);

              // time to save the milestone
              await objs[j].save();

              helpers.LOGGER.debug(`--> QQQ ${JSON.stringify(objs[j])}`);

              controllers.blockchain.createMilestone1(JSON.stringify(objs[j]), s._id);

              // Now I attach the milsetones to the shipment and save it
              s.milestones.push(objs[j]);
              await s.save();
            });
        }

        return res.status(201).json({});
      });
    });
  }

  static populateTradeUnits(req, res, next) {
    helpers.LOGGER.info("populateTradeUnits - '/' - called");

    helpers.LOGGER.info(`datas.tradeUnitData - ${JSON.stringify(datas.tradeUnitData)}`);

    models.TradeUnit.insertMany(datas.tradeUnitData, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.status(201).json(objs);
    });
  }

  static populateLogisticUnits(req, res, next) {
    helpers.LOGGER.info("populateLogisticUnits - '/' - called");

    helpers.LOGGER.info(`datas.logisticUnitData - ${JSON.stringify(datas.logisticUnitData)}`);

    models.LogisticUnit.insertMany(datas.logisticUnitData, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.status(201).json(objs);
    });
  }

  static createShipment(req, res, next) {
    helpers.LOGGER.info("createShipment - '/' - called");

    // temporary generation of SSCC
    const sscc = "7633333." + Math.floor(Math.random() * Math.floor(9999999999))

    const shipment = models.Shipment({
      // TODO: This should be changed with better implementation
      "SSCC": sscc,
      "from": "Basel",
      "to": "Atlanta"
    });

    shipment.save((err, o) => {
      if (err) {
        next(boom.badImplementation(err));
      } else {
        return res.status(201).json(o._id);
      }
    });
  }

  static async cleanAll(req, res, next) {
    helpers.LOGGER.info("cleanAll - '/' - called");

    await Promise.all([
      models.ConsumableUnit.deleteMany({}),
      models.TradeUnit.deleteMany({}),
      models.LogisticUnit.deleteMany({}),
      models.Location.deleteMany({}),
      models.Event.deleteMany({}),
      models.Milestone.deleteMany({}),
      models.Shipment.deleteMany({}),
      models.Company.deleteMany({}),
    ]);

    return res.status(201).json({});
  }

  static async populateAll(req, res, next) {
    helpers.LOGGER.info("populateAll - '/' - called");

    await Promise.all([
      models.Company.insertMany(datas.companyData),
      models.Location.insertMany(datas.locationData),
      models.ConsumableUnit.insertMany(datas.consumableUnitData),
      models.TradeUnit.insertMany(datas.tradeUnitData),
      models.LogisticUnit.insertMany(datas.logisticUnitData),
    ]);

    return res.status(201).json({});
  }

}

export default Populate;