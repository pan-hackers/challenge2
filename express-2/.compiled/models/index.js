"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TokenKey", {
  enumerable: true,
  get: function get() {
    return _key["default"];
  }
});
exports["default"] = exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _key = _interopRequireDefault(require("./key"));

var _user = _interopRequireDefault(require("./user"));

var _message = _interopRequireDefault(require("./message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectDb = function connectDb() {
  return _mongoose["default"].connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  });
};

exports.connectDb = connectDb;
var models = {
  User: _user["default"],
  Message: _message["default"]
};
var _default = models;
exports["default"] = _default;
//# sourceMappingURL=index.js.map