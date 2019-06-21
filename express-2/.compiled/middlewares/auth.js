"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _boom = _interopRequireDefault(require("@hapi/boom"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _helpers = _interopRequireDefault(require("../helpers"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var bearerHeader = req.headers['authorization']; // Check if bearer is undefined

  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    var bearer = bearerHeader.split(' '); // Get token from array

    var bearerToken = bearer[1]; // decode token

    if (bearerToken) {
      _helpers["default"].LOGGER.debug('Going to validate the token'); // verifies secret and checks exp


      _jsonwebtoken["default"].verify(bearerToken, _models.TokenKey, function (err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      next(_boom["default"].unauthorized('No token provided.'));
    }
  } else {
    // if there is no token
    // return an error
    next(_boom["default"].unauthorized('No token provided.'));
  }
};

var auths = {
  verifyToken: verifyToken
};
var _default = auths;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map