"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _csvParse = _interopRequireDefault(require("csv-parse"));

var _fs = _interopRequireDefault(require("fs"));

var _tsyringe = require("tsyringe");

var _ISubscriberRepository = _interopRequireDefault(require("../repositories/ISubscriberRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateDistributionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SubscriberRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISubscriberRepository.default === "undefined" ? Object : _ISubscriberRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateDistributionService {
  constructor(subscriberRepository) {
    this.subscriberRepository = subscriberRepository;
  }

  async execute(filePath) {
    const contactsReadStream = _fs.default.createReadStream(filePath);

    const parseStream = (0, _csvParse.default)({
      from_line: 1,
      ltrim: true,
      rtrim: true
    });
    const parseCSV = contactsReadStream.pipe(parseStream);
    const subscribers = [];
    parseCSV.on('data', line => {
      const [seq, name, email] = line.map(cell => cell);
      subscribers.push({
        seq,
        name,
        email
      });
    });
    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });
    const CSVSubscribers = subscribers.reduce((result, currentValue) => {
      return result.find(e => e.email === currentValue.email) ? result : [...result, currentValue];
    }, []);
    const existsEmails = await this.subscriberRepository.findByEmails(CSVSubscribers.map(e => {
      return e.email;
    }));
    const addSubscribers = CSVSubscribers.filter(subscriber => !existsEmails.includes(subscriber.email));
    await this.subscriberRepository.import(addSubscribers.map(sub => ({
      name: sub.name,
      email: sub.email
    })));
  }

}) || _class) || _class) || _class) || _class);
exports.default = CreateDistributionService;