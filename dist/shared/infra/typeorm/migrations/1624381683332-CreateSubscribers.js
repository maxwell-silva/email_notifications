"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateSubscribers1624381683332 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'subscribers',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'last_name',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'subscription_status',
        type: 'boolean',
        default: true
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
    await queryRunner.dropTable('subscribers');
  }

}

exports.default = CreateSubscribers1624381683332;