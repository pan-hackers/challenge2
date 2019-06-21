"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _helpers = _interopRequireDefault(require("../helpers"));

var _key = _interopRequireDefault(require("./key"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _boom = _interopRequireDefault(require("@hapi/boom"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
}, {
  timestamps: true
});

userSchema.statics.findByLogin =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(login) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.findOne({
              username: login
            });

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return this.findOne({
              email: login
            });

          case 6:
            user = _context.sent;

          case 7:
            return _context.abrupt("return", user);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

userSchema.pre('save', function (next) {
  var user = this;

  _helpers["default"].LOGGER.debug("".concat(user.username, " is going to hash the password"));

  if (!user.isModified('password')) {
    return next();
  }

  _bcryptjs["default"].hash(user.password, 10).then(function (hashedPassword) {
    user.password = hashedPassword;

    _helpers["default"].LOGGER.debug("".concat(user.username, " has hashed the password now"));

    next();
  });
}, function (err) {
  next(_boom["default"].badImplementation(err));
});

userSchema.methods.comparePassword =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(candidatePassword, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _helpers["default"].LOGGER.debug("comparePassword: ".concat(this.password));

            _helpers["default"].LOGGER.debug("comparePassword: ".concat(candidatePassword));

            _context2.next = 4;
            return _bcryptjs["default"].compare(candidatePassword, this.password, function (err, isMatch) {
              if (err) return next(_boom["default"].unauthorized(err));

              _helpers["default"].LOGGER.debug("comparePassword: ".concat(isMatch));

              next(null, isMatch);
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

userSchema.statics.getAll =
/*#__PURE__*/
function () {
  var _getAll = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.find().map(function (u) {
              var password = u.password,
                  userWithoutPassword = _objectWithoutProperties(u, ["password"]);

              return userWithoutPassword;
            });

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function getAll() {
    return _getAll.apply(this, arguments);
  }

  return getAll;
}();

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.js.map