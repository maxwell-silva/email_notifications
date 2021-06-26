"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _path = _interopRequireDefault(require("path"));

require("../../../shared/infra/typeorm");

var _IQueueProvider = _interopRequireDefault(require("../../../shared/container/providers/QueueProvider/models/IQueueProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ProcessQueueService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('QueueProvider')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IQueueProvider.default === "undefined" ? Object : _IQueueProvider.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ProcessQueueService {
  constructor(queueProvider, mailProvider, cacheProvider) {
    this.queueProvider = queueProvider;
    this.mailProvider = mailProvider;
    this.cacheProvider = cacheProvider;
  }

  execute() {
    this.queueProvider.process(async job => {
      const {
        contact,
        distributionId
      } = job.data;
      const {
        email
      } = contact;
      const key = `mail-${distributionId}:${email}`;
      const emailCache = await this.cacheProvider.recover(key);

      if (emailCache) {
        throw new _AppError.default('This email already tried!');
      }

      try {
        const invitedTemplate = _path.default.resolve(__dirname, '..', 'views', 'invited_IOExtended.hbs');

        await this.mailProvider.sendMail({
          to: {
            name: contact.name,
            email: contact.email
          },
          subject: '[Google I/O Extended 2021] Inscreva-se',
          templateData: {
            file: invitedTemplate,
            variables: {
              name: contact.name
            }
          }
        });
      } catch (err) {
        await this.cacheProvider.save(key, {
          deliveryStatus: false,
          deliveryFailure: true
        });
        console.log(err);
        throw new _AppError.default('Algo deu errado');
      }

      console.log(`eiiiiii`);
      await this.cacheProvider.save(key, {
        deliveryStatus: true,
        deliveryFailure: false
      });
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ProcessQueueService;