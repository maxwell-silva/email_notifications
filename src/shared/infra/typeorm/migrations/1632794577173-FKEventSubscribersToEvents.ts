import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKEventSubscribersToEvents1632794577173
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'event_subscribers',
      new TableForeignKey({
        name: 'FKeyEventSubscribersToEvents',
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
      'event_subscribers',
      'FKeyEventSubscribersToEvents',
    );
  }
}
