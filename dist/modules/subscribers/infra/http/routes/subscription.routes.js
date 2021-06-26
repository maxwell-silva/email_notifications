"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _multer = _interopRequireDefault(require("multer"));

var _LeaveSubscriptionController = _interopRequireDefault(require("../controllers/LeaveSubscriptionController"));

var _SubscriptionsController = _interopRequireDefault(require("../controllers/SubscriptionsController"));

var _CSVImportController = _interopRequireDefault(require("../controllers/CSVImportController"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subscriptionRouter = (0, _express.Router)();
const leaveSubscriptionController = new _LeaveSubscriptionController.default();
const subscriptionsController = new _SubscriptionsController.default();
const csvImporterController = new _CSVImportController.default();
const upload = (0, _multer.default)(_upload.default.multer);
subscriptionRouter.post('/join', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    lastName: _celebrate.Joi.string(),
    email: _celebrate.Joi.string().email().required()
  }
}), subscriptionsController.create);
subscriptionRouter.use(_ensureAuthenticated.default);
subscriptionRouter.post('/import', upload.single('file'), csvImporterController.create);
subscriptionRouter.post('/leave', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    distribution_id: _celebrate.Joi.string().uuid().required(),
    subscriber_id: _celebrate.Joi.string().uuid().required()
  }
}), leaveSubscriptionController.create);
var _default = subscriptionRouter;
exports.default = _default;