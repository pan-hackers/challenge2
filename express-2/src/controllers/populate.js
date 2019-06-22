import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';
import datas from '../data';
import { model } from 'mongoose';

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
    helpers.LOGGER.info("populateCompanies - '/' - called");

    helpers.LOGGER.info(`datas.companyData - ${JSON.stringify(datas.milestoneDataARR)}`);

    models.Milestone.insertMany(datas.milestoneDataARR, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.status(201).json(objs);
    });
  }

  static populateMilestoneDEP(req, res, next) {
    helpers.LOGGER.info("populateCompanies - '/' - called");

    helpers.LOGGER.info(`datas.companyData - ${JSON.stringify(datas.milestoneDataDEP)}`);

    models.Milestone.insertMany(datas.milestoneDataDEP, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.status(201).json(objs);
    });
  }

  static populateMilestonePOD(req, res, next) {
    helpers.LOGGER.info("populateCompanies - '/' - called");

    helpers.LOGGER.info(`datas.companyData - ${JSON.stringify(datas.milestoneDataPOD)}`);

    models.Milestone.insertMany(datas.milestoneDataPOD, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.status(201).json(objs);
    });
  }

  static populateMilestonePUP(req, res, next) {
    helpers.LOGGER.info("populateMilestonePUP - '/' - called");

    helpers.LOGGER.info(`datas.milestoneDataPUP - ${JSON.stringify(datas.milestoneDataPUP)}`);

    models.Milestone.insertMany(datas.milestoneDataPUP, (err, objs) => {
      if (err) {
        next(boom.badRequest(err));
      }


      for (let i = 0; i < 10; i++) { 
       objs[0].events.push( new models.Event({what: "gtin", when: new Date(), where: "gln", why: "pallet arrived", action: "OBSERVE"}))
      }

      return res.status(201).json(objs);
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