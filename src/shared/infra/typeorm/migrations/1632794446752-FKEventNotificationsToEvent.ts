import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKEventNotificationsToEvent1632794446752
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'event_notifications',
      new TableForeignKey({
        name: 'FKeyEventNotificationsToEvent',
        columnNames: ['event_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'events',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'event_notifications',
      'FKeyEventNotificationsToEvent',
    );
  }
}
