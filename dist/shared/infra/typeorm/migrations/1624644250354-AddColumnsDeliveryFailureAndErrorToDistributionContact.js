"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddColumnsDeliveryFailureAndErrorToDistributionContact1624644250354 {
  async up(queryRunner) {
    await queryRunner.addColumn('distribution_contacts', new _typeorm.TableColumn({
      name: 'delivery_failure',
      type: 'boolean',
      isNullable: true
    }));
    await queryRunner.addColumn('distribution_contacts', new _typeorm.TableColumn({
      name: 'error',
      type: 'varchar',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('distribution_contacts', 'delivery_failure');
    await queryRunner.dropColumn('distribution_contacts', 'error');
  }

}

exports.default = AddColumnsDeliveryFailureAndErrorToDistributionContact1624644250354;