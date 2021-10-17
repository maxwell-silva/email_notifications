import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addColumnNameToGroups1633239336995
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'groups',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('groups', 'name');
  }
}
