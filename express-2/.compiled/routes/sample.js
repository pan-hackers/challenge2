"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _boom = _interopRequireDefault(require("@hapi/boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/', function (req, res, next) {
  var response = {
    description: 'Welcome to Blockchain APIs'
  }; //res.send(boom.badRequest('missing id'));

  next(_boom["default"].badRequest('missing id')); //return next(boom.badRequest('missing id'));
  //return res.json(response);
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=sample.js.map