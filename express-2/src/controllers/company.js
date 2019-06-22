import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';

class Company {
  constructor() {

  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    const query = {};

    models.Company.find(query, (err, companies) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.json(companies);
    });
  }

  static getByGCP(req, res, next) {
    helpers.LOGGER.info("getByGCP - '/:gcp' - called");

    const query = {};

    if (req.params.gcp) {
      query.GCP = req.params.gcp;
    }

    models.Company.findOne(query, (err, company) => {
      if (err) {
        next(boom.badRequest(err));
      }

      if (company) {
        return res.json(company);
      }
      next(boom.notFound('Company not found'));
    });
  }

  static create(req, res, next) {
    helpers.LOGGER.info("post - '/' - called");
    const company = new models.Company(req.body);

    helpers.LOGGER.info(`company modeled: ${JSON.stringify(company)}`);
    company.save((err, c) => {
      if (err) {
        next(boom.badImplementation(err));
      } 
      
      return res.status(201).json(c);
    });
  }
}

export default Company;