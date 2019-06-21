import jwt from 'jsonwebtoken';
import boom from '@hapi/boom';
import helpers from '../helpers';

import models from '../models';

import { TokenKey } from '../models';

class User {
  constructor() {

  }

  static signup(req, res, next) {
    helpers.LOGGER.info("signup - '/' - called");

    const query = {};

    if (req.body.username) {
      query.username = req.body.username;
    }

    /* */
    models.User.findOne(query, (err, user) => {
      if (err) {
        next(boom.badRequest(err));
      }

      if (!user) {
        const user1 = new models.User({
          username: req.body.username,
          password: req.body.password,
        });

        user1.save((err, u) => {
          if (err) {
            next(boom.badImplementation(err));
          } else {
            helpers.LOGGER.debug(`${u.username} saved to users collection.`);
            const userWithoutPassword = (({ username, createdAt }) => ({ username, createdAt }))(u);

            return res.json(userWithoutPassword);
          }
        });
      } else
        next(boom.badRequest('Username already existing'));
    });
  }

  static async signin(req, res, next) {
    helpers.LOGGER.info("signin - '/' - called");

    const query = {};

    if (req.body.username) {
      query.username = req.body.username;
    }

    /* */
    models.User.findOne(query, (err, user) => {
      if (err) {
        next(boom.badRequest(err));
      }

      if (user) {
        // compare the password now
        helpers.LOGGER.debug(`${user.username}: let's check the passwords`);
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) next(boom.unauthorized('Not authorized'));

          if (isMatch) {
            helpers.LOGGER.debug(`${user.username}: Password match`);
            const token = jwt.sign({ sub: user.username }, TokenKey);

            const userWithoutPassword = (({ username, createdAt }) => ({ username, createdAt }))(user);
            userWithoutPassword.token = token;
            helpers.LOGGER.info(`${user.username}: User Found`);

            return res.json(userWithoutPassword);
          }
        });
      };
    });
  }

  static getAll(req, res, next) {
    helpers.LOGGER.info("getAll - '/' - called");

    const query = {};

    models.User.find(query, (err, users) => {
      if (err) {
        next(boom.badRequest(err));
      }

      const usersWithoutPassword = users.map(u => {
        const userWithoutPassword = (({ username, createdAt }) => ({ username, createdAt }))(u);
        return userWithoutPassword;
      });

      return res.json(usersWithoutPassword);
    });
  }

  static getByUsername(req, res, next) {
    helpers.LOGGER.info("getByUsername - '/:username' - called");

    const query = {};

    if (req.params.username) {
      query.username = req.params.username;
    }

    models.User.findOne(query, (err, user) => {
      if (err) {
        next(boom.badRequest(err));
      }

      if (user) {
        const userWithoutPassword = (({ username, createdAt }) => ({ username, createdAt }))(user);

        helpers.LOGGER.debug(`--> ${userWithoutPassword.username}`);
        return res.json(userWithoutPassword);
      }
      next(boom.notFound('User not found'));
    });
  }
}

export default User;