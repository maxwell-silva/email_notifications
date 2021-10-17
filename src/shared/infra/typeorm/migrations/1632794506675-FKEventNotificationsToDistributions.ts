import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKEventNotificationsToDistributions1632794506675
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'event_notifications',
      new TableForeignKey({
        name: 'FKeyEventNotificationsToDistributions',
        columnNames: ['distribution_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'distributions',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'event_notifications',
      'FKeyEventNotificationsToDistributions',
    );
  }
}
