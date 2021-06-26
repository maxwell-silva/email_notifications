"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _NotificationsController = _interopRequireDefault(require("../controllers/NotificationsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subscriptionRouter = (0, _express.Router)();
const notificationsController = new _NotificationsController.default();
subscriptionRouter.use(_ensureAuthenticated.default);
subscriptionRouter.post('/', notificationsController.create);
var _default = subscriptionRouter;
exports.default = _default;