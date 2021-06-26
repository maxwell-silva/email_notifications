"use strict";

var _cache = _interopRequireDefault(require("../../../../config/cache"));

var _mail = _interopRequireDefault(require("../../../../config/mail"));

var _tsyringe = require("tsyringe");

var _BullProvider = _interopRequireDefault(require("./implementations/BullProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  bullProvider: _BullProvider.default
};
const redisConfig = _cache.default.config.redis;
const Queue = providers.bullProvider;

_tsyringe.container.registerInstance('QueueProvider', new Queue({ ..._mail.default.queue,
  redis: redisConfig
}));