"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _LeaveSubscriptionService = _interopRequireDefault(require("../../../services/LeaveSubscriptionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LeaveSubscriptionController {
  async create(request, response) {
    const {
      subscriber_id,
      distribution_id
    } = request.body;

    const leaveSubscriptionService = _tsyringe.container.resolve(_LeaveSubscriptionService.default);

    await leaveSubscriptionService.execute({
      subscriber_id,
      distribution_id
    });
    return response.status(204).json();
  }

}

exports.default = LeaveSubscriptionController;