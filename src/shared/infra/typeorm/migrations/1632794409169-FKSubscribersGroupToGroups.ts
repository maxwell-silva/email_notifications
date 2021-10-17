import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKSubscribersGroupToGroups1632794409169
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'subscribers_group',
      new TableForeignKey({
        name: 'FKeySubscribersGroupToGroups',
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
      'subscribers_group',
      'FKeySubscribersGroupToGroups',
    );
  }
}
