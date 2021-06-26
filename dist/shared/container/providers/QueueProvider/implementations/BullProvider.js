"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bull = _interopRequireDefault(require("bull"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BullProvider {
  constructor(queueConfig) {
    this.queue = void 0;
    this.queue = new _bull.default('mail-queue', queueConfig);
  }

  async add(data) {
    if (Array.isArray(data)) {
      const parsedJobs = data.map(jobData => {
        return {
          data: jobData
        };
      });
      await this.queue.addBulk(parsedJobs);
      return;
    }

    await this.queue.add(data);
  }

  process(processFunction) {
    const time = 1000 * 60 * 5;
    this.queue.process(time, processFunction);
  }

}

var _default = BullProvider;
exports.default = _default;