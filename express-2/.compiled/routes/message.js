"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _controllers = _interopRequireDefault(require("../controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-param-reassign */
var router = (0, _express.Router)();
router.use('/:messageId', _middlewares["default"].message);
router.get('/', _middlewares["default"].auths.verifyToken, _controllers["default"].message.getAll);
router.get('/:messageId', _middlewares["default"].auths.verifyToken, _controllers["default"].message.getById);
router.post('/', _middlewares["default"].auths.verifyToken, _controllers["default"].message.create);
router.put('/:messageId', _middlewares["default"].auths.verifyToken, _controllers["default"].message.modify);
router.patch('/:messageId', _middlewares["default"].auths.verifyToken, _controllers["default"].message.patch);
router["delete"]('/:messageId', _middlewares["default"].auths.verifyToken, _controllers["default"].message["delete"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=message.js.map