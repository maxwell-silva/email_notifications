import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class addColumnsToDistributionContact1633575401619
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'distribution_contacts',
      new TableColumn({
        name: 'group_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'distribution_contacts',
      new TableForeignKey({
        name: 'FKeyDistributionContatcToGroup',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'distribution_contacts',
      'FKeyDistributionContatcToGroup',
    );

    await queryRunner.dropColumn('distribution_contacts', 'group_id');
  }
}
