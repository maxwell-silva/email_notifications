"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Subscriber = _interopRequireDefault(require("../entities/Subscriber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SubscriberRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Subscriber.default);
  }

  async findById(id) {
    const subscriber = await this.ormRepository.findOne(id);
    return subscriber;
  }

  async findByEmail(email) {
    const subscriber = await this.ormRepository.findOne(email);
    return subscriber;
  }

  async findByEmails(emails) {
    const alreadyExists = await this.ormRepository.find({
      select: ['email'],
      where: {
        email: (0, _typeorm.In)(emails)
      }
    });
    const alreadyExistsEmails = alreadyExists.map(e => {
      return e.email;
    });
    return alreadyExistsEmails;
  }

  async findAllSubscribers(subscription_status) {
    const subscribers = await this.ormRepository.find({
      where: {
        subscription_status
      }
    });
    return subscribers;
  }

  async create({
    name,
    lastName,
    email
  }) {
    const subscriber = this.ormRepository.create({
      name,
      email,
      last_name: lastName,
      subscription_status: true
    });
    await this.ormRepository.save(subscriber);
    return subscriber;
  }

  async save(subscriber) {
    return this.ormRepository.save(subscriber);
  }

  async import(data) {
    const subscribers = this.ormRepository.create(data);
    await this.ormRepository.save(subscribers);
  }

}

var _default = SubscriberRepository;
exports.default = _default;