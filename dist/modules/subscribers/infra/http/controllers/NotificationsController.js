"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SendNotificationEmailService = _interopRequireDefault(require("../../../services/SendNotificationEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationsController {
  async create(request, response) {
    const {
      distribution_id
    } = request.body;

    const sendNotificationEmailService = _tsyringe.container.resolve(_SendNotificationEmailService.default);

    await sendNotificationEmailService.execute({
      distribution_id
    });
    return response.status(204).json();
  }

}

exports.default = NotificationsController;