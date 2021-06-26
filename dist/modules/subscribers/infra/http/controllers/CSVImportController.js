"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ImportSubscribersService = _interopRequireDefault(require("../../../services/ImportSubscribersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImportController {
  async create(request, response) {
    const importSubscribersService = _tsyringe.container.resolve(_ImportSubscribersService.default);

    await importSubscribersService.execute(request.file.path);
    return response.status(204).json();
  }

}

exports.default = ImportController;