"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IDistributionRepository = _interopRequireDefault(require("../repositories/IDistributionRepository"));

var _IDistributionContactRepository = _interopRequireDefault(require("../repositories/IDistributionContactRepository"));

var _ISubscriberRepository = _interopRequireDefault(require("../repositories/ISubscriberRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateDistributionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DistributionRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DistributionContactRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('SubscriberRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IDistributionRepository.default === "undefined" ? Object : _IDistributionRepository.default, typeof _IDistributionContactRepository.default === "undefined" ? Object : _IDistributionContactRepository.default, typeof _ISubscriberRepository.default === "undefined" ? Object : _ISubscriberRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateDistributionService {
  constructor(distributionRepository, distributionContactRepository, subscriberRepository) {
    this.distributionRepository = distributionRepository;
    this.distributionContactRepository = distributionContactRepository;
    this.subscriberRepository = subscriberRepository;
  }

  async execute({
    subscriber_id,
    distribution_id
  }) {
    const subscriber = await this.subscriberRepository.findById(subscriber_id);

    if (!subscriber) {
      throw new _AppError.default('Ínvalid Request');
    }

    subscriber.subscription_status = false;
    await this.subscriberRepository.save(subscriber);

    if (distribution_id) {
      const distributionContact = await this.distributionContactRepository.findBySubscriberAndDistribution(subscriber_id, distribution_id);

      if (!distributionContact) {
        throw new _AppError.default('Ínvalid Request');
      }

      distributionContact.unsubscription = true;
      await this.distributionContactRepository.save(distributionContact);
    }
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateDistributionService;