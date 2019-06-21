import boom from '@hapi/boom';
import helpers from '../helpers';

import { LEDGER } from '../services';
import models from '../models';

class Blockchain {
  constructor() {
  }

  static loadBlockchain(req, res, next) {
    helpers.LOGGER.info("loadBlockchain - '/' - called");

    LEDGER(next).then(async () => {
      helpers.LOGGER.info("LEDGER filled");

      res.sendStatus(200);
    });
  }

  static saveBlockchain(req, res, next) {
    helpers.LOGGER.info("saveBlockchain - '/' - called");

    LEDGER(next).save().then(async () => {
      helpers.LOGGER.info("LEDGER saved");

      res.sendStatus(200);
    });
  }

  static foo(req, res, next) {
    helpers.LOGGER.info("foo - '/' - called");

    res.send('foo');
  }

  static newBlock(req, res, next) {
    helpers.LOGGER.info("newBlock - '/' - called");

    models.Blockchain.findOne((err, c) => {
      if (err) {
        next(boom.badImplementation(err));
      }

      if (!c)
        c = new models.Blockchain();

      helpers.LOGGER.info(`1. ${JSON.stringify(c)}`);
      c.newBlock();

      c.save((err, b) => {
        if (err) {
          next(boom.badImplementation(err));
        } else {
          helpers.LOGGER.debug(`blockchain saved to blocks collection.`);

          return res.status(200).json(b);
        }
      });
    });
  };

  static createTransaction(req, res, next) {
    helpers.LOGGER.info("createTransaction - '/' - called");

    const coin = new models.Coin({
      sender: "Marcin",
      receiver: "Piotr",
      amount: 0
    });

    models.Blockchain
      .findOne({})
      .populate('chain')
      .populate('currentTransactions')
      .populate('currentTransactions')
      .populate('chain.data')
      .populate('currentTransactions.data')
      .exec((err, blockchain) => {
        if (err) {
          next(boom.badImplementation(err));
        }

        if (!blockchain) {
          blockchain = new models.Blockchain();
        }

        helpers.LOGGER.debug('creating new transaction');
        blockchain.newTransaction(coin);
        helpers.LOGGER.debug('creating new block');
        blockchain.newBlock();

        blockchain.save((err, b) => {
          if (err) {
            next(boom.badImplementation(err));
          } else {
            helpers.LOGGER.debug(`blockchain saved to blocks collection.`);

            return res.status(200).json(b);
          }
        });
      });
  }

  static createBlock(req, res) {
    helpers.LOGGER.info("create - '/' - called");

    const blockchain = new models.Blockchain({
      index: 0,
      timestamp: 0,
      data: "data",
      prevHash: "prevHash",
      proofOfWork: 0,
      hash: "hash"
    });

    block.save((err, b) => {
      if (err) {
        next(boom.badImplementation(err));
      } else {
        helpers.LOGGER.debug(`block saved to blocks collection.`);

        return res.status(200).json(b);
      }
    });
  }

}

export default Blockchain;