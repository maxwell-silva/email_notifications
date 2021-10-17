import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addColumnsToDistribution1633575214061
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('distributions', [
      new TableColumn({
        name: 'subject',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'view_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('distributions', 'subject');
    await queryRunner.dropColumn('distributions', 'view_id');
  }
}
