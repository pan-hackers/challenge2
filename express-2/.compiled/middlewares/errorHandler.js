"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = _interopRequireDefault(require("../helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var errorHandler = function errorHandler(err, req, res, next) {
  _helpers["default"].LOGGER.info("errorHandler - '".concat(err, "' - ").concat(err.statusCode, " - called"));

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({
      message: 'Invalid Token'
    });
  }

  if (err.isServer) {// log the error...
    // probably you don't want to log unauthorized access
    // or do you?
  }

  return res.status(err.output.statusCode).json(err.output.payload);
  /*
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }
   
  */
};

var _default = errorHandler;
exports["default"] = _default;
//# sourceMappingURL=errorHandler.js.map