"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Distribution = _interopRequireDefault(require("../entities/Distribution"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DistributionRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Distribution.default);
  }

  async findById(id) {
    const distribution = await this.ormRepository.findOne(id);
    return distribution;
  }

  async create(description) {
    const distribution = this.ormRepository.create({
      description
    });
    await this.ormRepository.save(distribution);
    return distribution;
  }

  async save(distribution) {
    return this.ormRepository.save(distribution);
  }

}

var _default = DistributionRepository;
exports.default = _default;