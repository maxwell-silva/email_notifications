"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bull = _interopRequireDefault(require("bull"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MailQueue = new _bull.default('Mail');
var _default = MailQueue;
exports.default = _default;