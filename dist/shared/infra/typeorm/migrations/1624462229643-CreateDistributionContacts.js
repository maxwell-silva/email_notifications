"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateDistributionContacts1624462229643 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'distribution_contacts',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'distribution_id',
        type: 'uuid'
      }, {
        name: 'subscriber_id',
        type: 'uuid'
      }, {
        name: 'delivery_status',
        type: 'boolean',
        default: false
      }, {
        name: 'unsubscription',
        type: 'boolean',
        default: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('distribution_contacts');
  }

}

exports.default = CreateDistributionContacts1624462229643;