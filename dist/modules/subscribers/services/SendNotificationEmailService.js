"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _IQueueProvider = _interopRequireDefault(require("../../../shared/container/providers/QueueProvider/models/IQueueProvider"));

var _ISubscriberRepository = _interopRequireDefault(require("../repositories/ISubscriberRepository"));

var _IDistributionContactRepository = _interopRequireDefault(require("../repositories/IDistributionContactRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SendForgotPasswordEmailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SubscriberRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('QueueProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('DistributionContactRepository')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _ISubscriberRepository.default === "undefined" ? Object : _ISubscriberRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _IQueueProvider.default === "undefined" ? Object : _IQueueProvider.default, typeof _IDistributionContactRepository.default === "undefined" ? Object : _IDistributionContactRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class SendForgotPasswordEmailService {
  constructor(subscribersRepository, mailProvider, queueProvider, distributionContactRepository) {
    this.subscribersRepository = subscribersRepository;
    this.mailProvider = mailProvider;
    this.queueProvider = queueProvider;
    this.distributionContactRepository = distributionContactRepository;
  }

  async execute({
    distribution_id
  }) {
    const distributionContacts = await this.distributionContactRepository.findNoNotificatedContactsByDistribution(distribution_id);
    const messagesJob = [];
    distributionContacts.forEach(distributionContact => {
      var _distributionContact$;

      if ((_distributionContact$ = distributionContact.subscriber) !== null && _distributionContact$ !== void 0 && _distributionContact$.name && distributionContact.subscriber.email) {
        messagesJob.push({
          contact: {
            email: distributionContact.subscriber.email,
            name: distributionContact.subscriber.name
          },
          distributionId: distribution_id
        });
      }
    }); // const teste: IMessageJob[] = [
    //   // {
    //   //   contact: {
    //   //     email: 'fmsedrez@gmail.com',
    //   //     name: 'Sedrez',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'rodrigo.oliveira@unifeob.edu.br',
    //   //     name: 'Rodrigo Oliveira',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'elisabethmamede@gmail.com',
    //   //     name: 'Elisabeth',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'fmsedrez@kody.com.br',
    //   //     name: 'Sedrez',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'taciomedeiros@gmail.com',
    //   //     name: 'Tacio',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'shark.max@hotmail.com',
    //   //     name: 'Maxwell',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   // {
    //   //   contact: {
    //   //     email: 'carlos.stefan86@yahoo.com.br',
    //   //     name: 'Carlos',
    //   //   },
    //   //   distributionId: 'invitedTeste',
    //   // },
    //   {
    //     contact: {
    //       email: 'maxwell.tj@hotmail.com',
    //       name: 'Maxwell',
    //     },
    //     distributionId: 'invitedTeste',
    //   },
    //   {
    //     contact: {
    //       email: 'maxwellsilva1993@gmail.com',
    //       name: 'Maxwell',
    //     },
    //     distributionId: 'invitedTeste',
    //   },
    // ];

    /**
     * step 1, obter contatos da lista de distribuição que ainda não receberam e-mail.
     * step 2, chamar queue provider e adicionar aos agendamentos
     *
     */

    console.log(messagesJob);
    await this.queueProvider.add(messagesJob);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = SendForgotPasswordEmailService;