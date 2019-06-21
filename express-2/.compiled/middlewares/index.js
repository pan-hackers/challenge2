"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errorHandler = _interopRequireDefault(require("./errorHandler"));

var _message = _interopRequireDefault(require("./message"));

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var middlewares = {
  message: _message["default"],
  errorHandler: _errorHandler["default"],
  auths: _auth["default"]
};
var _default = middlewares;
exports["default"] = _default;
//# sourceMappingURL=index.js.map