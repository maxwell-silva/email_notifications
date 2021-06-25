import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnsDeliveryFailureAndErrorToDistributionContact1624644250354
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'distribution_contacts',
      new TableColumn({
        name: 'delivery_failure',
        type: 'boolean',
      }),
    );
    await queryRunner.addColumn(
      'distribution_contacts',
      new TableColumn({
        name: 'error',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('distribution_contacts', 'delivery_failure');
    await queryRunner.dropColumn('distribution_contacts', 'error');
  }
}
