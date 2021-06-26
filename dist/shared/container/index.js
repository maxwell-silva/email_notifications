"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _SubscribersRepository = _interopRequireDefault(require("../../modules/subscribers/infra/typeorm/repositories/SubscribersRepository"));

var _DistributionRepository = _interopRequireDefault(require("../../modules/subscribers/infra/typeorm/repositories/DistributionRepository"));

var _DistributionContactRepository = _interopRequireDefault(require("../../modules/subscribers/infra/typeorm/repositories/DistributionContactRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.default);

_tsyringe.container.registerSingleton('SubscriberRepository', _SubscribersRepository.default);

_tsyringe.container.registerSingleton('DistributionRepository', _DistributionRepository.default);

_tsyringe.container.registerSingleton('DistributionContactRepository', _DistributionContactRepository.default);