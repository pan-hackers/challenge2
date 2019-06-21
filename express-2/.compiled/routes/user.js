"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _controllers = _interopRequireDefault(require("../controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/signup', _controllers["default"].user.signup);
router.post('/signin', _controllers["default"].user.signin);
router.get('/', _middlewares["default"].auths.verifyToken, _controllers["default"].user.getAll);
router.get('/:username', _middlewares["default"].auths.verifyToken, _controllers["default"].user.getByUsername);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.js.map