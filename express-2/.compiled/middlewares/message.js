"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = _interopRequireDefault(require("../helpers"));

var _controllers = _interopRequireDefault(require("../controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var message = function message(req, res, next) {
  _helpers["default"].LOGGER.info("middleware - '/:messageId' - called");

  _controllers["default"].message.getAndStoreById(req, res, next);
};

var _default = message;
exports["default"] = _default;
//# sourceMappingURL=message.js.map