"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _DistributionContact = _interopRequireDefault(require("../entities/DistributionContact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DistributionContactRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_DistributionContact.default);
  }

  async findByEmailAndDistribution(email, distribution_id) {
    return this.ormRepository.findOne({
      where: {
        email,
        distribution_id
      }
    });
  }

  async findBySubscriberAndDistribution(subscriber_id, distribution_id) {
    return this.ormRepository.findOne({
      where: {
        subscriber_id,
        distribution_id
      }
    });
  }

  async create(distribution_id, subscribers) {
    const distributionContacts = subscribers.map(subscriber => {
      return this.ormRepository.create({
        distribution_id,
        subscriber_id: subscriber.id,
        delivery_status: false,
        unsubscription: false,
        delivery_failure: false
      });
    });
    return this.ormRepository.save(distributionContacts);
  }

  save(distributionContact) {
    return this.ormRepository.save(distributionContact);
  }

  async findNoNotificatedContactsByDistribution(distribution_id) {
    const distributionContacts = await this.ormRepository.find({
      where: {
        distribution_id,
        delivery_status: false,
        delivery_failure: false,
        unsubscription: false
      },
      relations: ['subscriber']
    });
    return distributionContacts;
  }

  async findNoNotificatedSubscribersByDistribution(distribution_id) {
    const distributionContacts = await this.ormRepository.createQueryBuilder('distribution_contacts').where(distribution_id).leftJoinAndSelect('distribution_contacts.subscriber', 'subscriber').getMany();
    return distributionContacts;
  }

}

var _default = DistributionContactRepository;
exports.default = _default;