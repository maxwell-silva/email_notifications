"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailProvider {
  constructor() {
    this.messages = [];
  }

  async sendMail(message) {
    this.messages.push(message);
  }

  async sendMails(data) {
    this.messages.push(data[0]);
  }

}

exports.default = FakeMailProvider;