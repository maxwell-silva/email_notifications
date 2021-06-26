"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class FKeyDistributionContactsToDistributions1624589156384 {
  async up(queryRunner) {
    await queryRunner.createForeignKey('distribution_contacts', new _typeorm.TableForeignKey({
      name: 'FKeyDistributionContactsToDistributions',
      columnNames: ['distribution_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'distributions',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('distribution_contacts', 'FKeyDistributionContactsToDistributions');
  }

}

exports.default = FKeyDistributionContactsToDistributions1624589156384;