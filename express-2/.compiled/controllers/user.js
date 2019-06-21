"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _boom = _interopRequireDefault(require("@hapi/boom"));

var _helpers = _interopRequireDefault(require("../helpers"));

var _models = _interopRequireWildcard(require("../models"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "signup",
    value: function signup(req, res, next) {
      _helpers["default"].LOGGER.info("signup - '/' - called");

      var query = {};

      if (req.body.username) {
        query.username = req.body.username;
      }
      /* */


      _models["default"].User.findOne(query, function (err, user) {
        if (err) {
          next(_boom["default"].badRequest(err));
        }

        if (!user) {
          var user1 = new _models["default"].User({
            username: req.body.username,
            password: req.body.password
          });
          user1.save(function (err, u) {
            if (err) {
              _helpers["default"].LOGGER.error("".concat(u.username, " not saved to users collection."));

              next(_boom["default"].badImplementation(err));
            } else {
              _helpers["default"].LOGGER.debug("".concat(u.username, " saved to users collection."));

              var userWithoutPassword = function (_ref) {
                var username = _ref.username,
                    createdAt = _ref.createdAt;
                return {
                  username: username,
                  createdAt: createdAt
                };
              }(u);

              return res.json(userWithoutPassword);
            }
          });
        } else {
          _helpers["default"].LOGGER.error("".concat(user.username, ": Username already existing"));

          next(_boom["default"].badRequest('Username already existing'));
        }

        ;
      });
    }
  }, {
    key: "signin",
    value: function () {
      var _signin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var query;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _helpers["default"].LOGGER.info("signin - '/' - called");

                query = {};

                if (req.body.username) {
                  query.username = req.body.username;
                }
                /* */


                _models["default"].User.findOne(query, function (err, user) {
                  if (err) {
                    next(_boom["default"].badRequest(err));
                  }

                  if (user) {
                    // compare the password now
                    _helpers["default"].LOGGER.debug("".concat(user.username, ": let's check the passwords"));

                    _helpers["default"].LOGGER.debug("".concat(req.body.password, ": passed password"));

                    user.comparePassword(req.body.password, function (err, isMatch) {
                      if (err) next(_boom["default"].unauthorized('Not authorized'));

                      if (isMatch) {
                        _helpers["default"].LOGGER.info("".concat(user.username, ": Password match"));

                        var token = _jsonwebtoken["default"].sign({
                          sub: user.username
                        }, _models.TokenKey);

                        var userWithoutPassword = function (_ref2) {
                          var username = _ref2.username,
                              createdAt = _ref2.createdAt;
                          return {
                            username: username,
                            createdAt: createdAt
                          };
                        }(user);

                        userWithoutPassword.token = token;

                        _helpers["default"].LOGGER.info("".concat(user.username, ": User Found"));

                        return res.json(userWithoutPassword);
                      }
                    });
                  }

                  ;
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signin(_x, _x2, _x3) {
        return _signin.apply(this, arguments);
      }

      return signin;
    }()
  }, {
    key: "getAll",
    value: function getAll(req, res, next) {
      _helpers["default"].LOGGER.info("getAll - '/' - called");

      var query = {};

      _models["default"].User.find(query, function (err, users) {
        if (err) {
          next(_boom["default"].badRequest(err));
        }

        var usersWithoutPassword = users.map(function (u) {
          var userWithoutPassword = function (_ref3) {
            var username = _ref3.username,
                createdAt = _ref3.createdAt;
            return {
              username: username,
              createdAt: createdAt
            };
          }(u);

          return userWithoutPassword;
        });
        return res.json(usersWithoutPassword);
      });
    }
  }, {
    key: "getByUsername",
    value: function getByUsername(req, res, next) {
      _helpers["default"].LOGGER.info("getByUsername - '/:username' - called");

      var query = {};

      if (req.params.username) {
        query.username = req.params.username;
      }

      _models["default"].User.findOne(query, function (err, user) {
        if (err) {
          next(_boom["default"].badRequest(err));
        }

        if (user) {
          var userWithoutPassword = function (_ref4) {
            var username = _ref4.username,
                createdAt = _ref4.createdAt;
            return {
              username: username,
              createdAt: createdAt
            };
          }(user);

          _helpers["default"].LOGGER.debug("--> ".concat(userWithoutPassword.username));

          return res.json(userWithoutPassword);
        }

        next(_boom["default"].notFound('User not found'));
      });
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.js.map