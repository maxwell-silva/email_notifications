import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddClolumnsToViews1633997230625
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('views', [
      new TableColumn({
        name: 'path',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('views', 'path');
    await queryRunner.dropColumn('views', 'name');
  }
}
