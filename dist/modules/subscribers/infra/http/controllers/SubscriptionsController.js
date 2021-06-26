"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _JoinSubscriptionService = _interopRequireDefault(require("../../../services/JoinSubscriptionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SubscriptionsController {
  async create(request, response) {
    const {
      name,
      lastName,
      email
    } = request.body;

    const joinSubscriptionService = _tsyringe.container.resolve(_JoinSubscriptionService.default);

    await joinSubscriptionService.execute({
      name,
      lastName,
      email
    });
    return response.status(204).json();
  }

}

exports.default = SubscriptionsController;