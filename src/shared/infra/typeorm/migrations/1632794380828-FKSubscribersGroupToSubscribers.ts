import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKSubscribersGroupToSubscribers1632794380828
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'subscribers_group',
      new TableForeignKey({
        name: 'FKeySubscribersGroupToSubscribers',
        columnNames: ['subscriber_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'subscribers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'subscribers_group',
      'FKeySubscribersGroupToSubscribers',
    );
  }
}
