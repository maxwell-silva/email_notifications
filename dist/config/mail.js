"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  queue: {
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000
      }
    },
    limiter: {
      max: 10,
      duration: 1000
    }
  },
  config: {
    mailtrap: {
      host: 'smtp.mailtrap.io',
      port: 2525,
      ssl: false,
      tls: true,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    },
    ses: {},
    fake: {}
  },
  maxShippingPerSecond: 14,
  shippingPerSecond: 10,
  defaults: {
    from: {
      email: 'organizers@devfest.com.br',
      name: 'GDG Organizers'
    }
  }
};
exports.default = _default;