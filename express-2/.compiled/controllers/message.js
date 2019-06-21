"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = _interopRequireDefault(require("../helpers"));

var _boom = _interopRequireDefault(require("@hapi/boom"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Message =
/*#__PURE__*/
function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, null, [{
    key: "getAll",
    value: function getAll(req, res, next) {
      _helpers["default"].LOGGER.info("get - '/' - called");

      var query = {}; //eslint-disable-next-line no-underscore-dangle

      if (req.query._id) {
        //eslint-disable-next-line no-underscore-dangle
        query._id = req.query._id;
      }

      if (req.query.text) {
        query.text = req.query.text;
      }

      if (req.query.user) {
        query.user = req.query.user;
      }

      _models["default"].Message.find(query, function (err, messages) {
        if (err) {
          //return res.send(err);
          next(_boom["default"].badRequest(err));
        }

        return res.json(messages);
      });
    }
  }, {
    key: "getById",
    value: function getById(req, res, next) {
      _helpers["default"].LOGGER.info("get - '/:messageId' - called");

      _models["default"].Message.findById(req.params.messageId, function (err, message) {
        if (err) {
          next(_boom["default"].badRequest(err));
        }

        return res.json(message);
      });
    }
  }, {
    key: "getAndStoreById",
    value: function getAndStoreById(req, res, next) {
      _helpers["default"].LOGGER.info("get - '/:messageId' - called");

      _models["default"].Message.findById(req.params.messageId, function (err, message) {
        if (err) {
          next(_boom["default"].badRequest(err));
        }

        if (message) {
          req.message = message;
          return next();
        }

        next(_boom["default"].notFound('Message not found'));
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      _helpers["default"].LOGGER.info("post - '/' - called");

      var message = new _models["default"].Message(req.body);
      message.save();
      return res.status(201).json(message);
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      _helpers["default"].LOGGER.info("put - '/' - called");

      var message = req.message;
      message.user = req.body.user;
      message.text = req.body.text;
      message.save(function (err) {
        if (err) {
          next(_boom["default"].badRequest(err));
        }

        return res.status(201).json(message);
      });
    }
  }, {
    key: "patch",
    value: function patch(req, res) {
      _helpers["default"].LOGGER.info("patch - '/' - called");

      var message = req.message; //eslint-disable-next-line no-underscore-dangle

      if (message._id) {
        //eslint-disable-next-line no-underscore-dangle
        delete message._id;
      }

      Object.entries(message).forEach(function (item) {
        var key = item[0];
        var value = item[1];
        message[key] = value;
      });
      message.save(function (err) {
        if (err) {
          next(_boom["default"].badRequest(err));
        }

        return res.status(201).json(message);
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      _helpers["default"].LOGGER.info("delete - '/' - called");

      var message = req.message;
      var result = null;
      result = message.remove();
      return res.send(result);
    }
  }]);

  return Message;
}();

var _default = Message;
exports["default"] = _default;
//# sourceMappingURL=message.js.map