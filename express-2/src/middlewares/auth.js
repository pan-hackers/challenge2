import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import helpers from '../helpers';
import { TokenKey } from '../models';

const verifyToken = (req, res, next) => {

  // check header or url parameters or post parameters for token
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];

    // decode token
    if (bearerToken) {
      helpers.LOGGER.debug('Going to validate the token');
      // verifies secret and checks exp
      jwt.verify(bearerToken, TokenKey, function (err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded; 
          next();
        }
      });
    }
    else {

      // if there is no token
      // return an error
      next(boom.unauthorized('No token provided.'));
    }
  } else {

    // if there is no token
    // return an error
    next(boom.unauthorized('No token provided.'));
  }
};

const auths = { verifyToken };

export default auths;
