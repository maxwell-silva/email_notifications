"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class FKeyDistributionContactsToSubscribers1624589124225 {
  async up(queryRunner) {
    await queryRunner.createForeignKey('distribution_contacts', new _typeorm.TableForeignKey({
      name: 'FKeyDistributionContactsToSubscribers',
      columnNames: ['subscriber_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'subscribers',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('distribution_contacts', 'FKeyDistributionContactsToSubscribers');
  }

}

exports.default = FKeyDistributionContactsToSubscribers1624589124225;