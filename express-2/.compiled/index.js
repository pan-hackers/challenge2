"use strict";

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _helpers = _interopRequireDefault(require("./helpers"));

var _middlewares = _interopRequireDefault(require("./middlewares"));

var _routes = _interopRequireDefault(require("./routes"));

var _models = require("./models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); //app.use(morgan('combined'));

/* Own middlewares */
//app.use(middlewares.auth);

/* Own APIs */

app.use('/api/users', _routes["default"].user);
app.use('/api/samples', _routes["default"].sample);
app.use('/api/messages', _routes["default"].message);
app.get('/protected', (0, _expressJwt["default"])({
  secret: 'djghhhhuuwiwuewieuwieuriwu'
}), function (req, res) {
  if (!req.user.admin) return res.sendStatus(401);
  res.sendStatus(200);
}); // Application global error handler

app.use(_middlewares["default"].errorHandler);
(0, _models.connectDb)().then(
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          app.listen(process.env.PORT, function () {
            return _helpers["default"].LOGGER.info("Blockchain Supply Chain App is listening on port ".concat(process.env.PORT, "!"));
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
//# sourceMappingURL=index.js.map