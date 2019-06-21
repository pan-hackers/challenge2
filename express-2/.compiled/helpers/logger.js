"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _log4js = _interopRequireDefault(require("log4js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGERLEVEL;
var _default = logger;
exports["default"] = _default;
//# sourceMappingURL=logger.js.map