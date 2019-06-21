import helpers from '../helpers';
import boom from '@hapi/boom';

import models from '../models';

class Message {
  constructor() {

  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("get - '/' - called");
    const query = {};

    //eslint-disable-next-line no-underscore-dangle
    if (req.query._id) {
      //eslint-disable-next-line no-underscore-dangle
      query._id = req.query._id;
    }

    if (req.query.text) {
      query.text = req.query.text;
    }

    if (req.query.user) {
      query.user = req.query.user;
    }

    models.Message.find(query, (err, messages) => {
      if (err) {
        //return res.send(err);
        next(boom.badRequest(err));
      }
      return res.json(messages);
    });
  }

  static getById(req, res, next) {
    helpers.LOGGER.info("get - '/:messageId' - called");
    models.Message.findById(req.params.messageId, (err, message) => {
      if (err) {
        next(boom.badRequest(err));
      }

      return res.json(message);
    });
  }

  static getAndStoreById(req, res, next) {
    helpers.LOGGER.info("get - '/:messageId' - called");
    models.Message.findById(req.params.messageId, (err, message) => {
      if (err) {
        next(boom.badRequest(err));
      }
      if (message) {
        req.message = message;
        return next();
      }
      next(boom.notFound('Message not found'));
    });
  }

  static create(req, res) {
    helpers.LOGGER.info("post - '/' - called");
    const message = new models.Message(req.body);

    message.save();
    return res.status(201).json(message);
  }

  static modify(req, res) {
    helpers.LOGGER.info("put - '/' - called");
    const { message } = req;
    message.user = req.body.user;
    message.text = req.body.text;

    message.save((err) => {
      if (err) {
        next(boom.badRequest(err));
      }
      return res.status(201).json(message);
    });
  }

  static patch(req, res) {
    helpers.LOGGER.info("patch - '/' - called");
    const { message } = req;

    //eslint-disable-next-line no-underscore-dangle
    if (message._id) {
      //eslint-disable-next-line no-underscore-dangle
      delete message._id;
    }

    Object.entries(message).forEach((item) => {
      const key = item[0];
      const value = item[1];

      message[key] = value;
    });

    message.save((err) => {
      if (err) {
        next(boom.badRequest(err));
      }
      return res.status(201).json(message);
    });
  }

  static delete(req, res) {
    helpers.LOGGER.info("delete - '/' - called");
    const { message } = req;
    let result = null;

    result = message.remove();

    return res.send(result);
  }

}

export default Message;