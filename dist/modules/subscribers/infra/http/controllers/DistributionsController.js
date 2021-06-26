"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateDistributionService = _interopRequireDefault(require("../../../services/CreateDistributionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationsController {
  async create(request, response) {
    const {
      description
    } = request.body;

    const createDistributionService = _tsyringe.container.resolve(_CreateDistributionService.default);

    const {
      id
    } = await createDistributionService.execute({
      description
    });
    return response.json({
      id,
      description
    });
  }

}

exports.default = NotificationsController;