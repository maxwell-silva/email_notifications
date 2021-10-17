import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKEventSubscribersToSubscribers1632794590564
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'event_subscribers',
      new TableForeignKey({
        name: 'FKeyEventSubscribersToSubscribers',
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
      'event_subscribers',
      'FKeyEventSubscribersToSubscribers',
    );
  }
}
