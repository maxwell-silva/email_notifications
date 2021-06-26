"use strict";

require("reflect-metadata");

require("dotenv/config");

var _tsyringe = require("tsyringe");

require("../../container");

require("../typeorm");

var _ProcessQueueService = _interopRequireDefault(require("../../../modules/subscribers/services/ProcessQueueService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const processQueue = _tsyringe.container.resolve(_ProcessQueueService.default);

processQueue.execute();
console.log('⚗‎‎  Processing mail sending queue!');