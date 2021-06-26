"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));

var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routes"));

var _notification = _interopRequireDefault(require("../../../../modules/subscribers/infra/http/routes/notification.routes"));

var _distribution = _interopRequireDefault(require("../../../../modules/subscribers/infra/http/routes/distribution.routes"));

var _subscription = _interopRequireDefault(require("../../../../modules/subscribers/infra/http/routes/subscription.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/password', _password.default);
routes.use('/profile', _profile.default);
routes.use('/notification', _notification.default);
routes.use('/distribution', _distribution.default);
routes.use('/subscription', _subscription.default);
var _default = routes;
exports.default = _default;