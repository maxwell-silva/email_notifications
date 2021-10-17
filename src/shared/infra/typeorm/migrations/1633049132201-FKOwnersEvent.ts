import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
// ligar com eventos
export default class FKOwnersEvent1633049132201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'event_organizers',
      new TableForeignKey({
        name: 'FKeyOwnersEventToGroup',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'event_organizers',
      new TableForeignKey({
        name: 'FKeyOwnersEventToEvent',
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
      'event_organizers',
      'FKeyOwnersEventToGroup',
    );
    await queryRunner.dropForeignKey(
      'event_organizers',
      'FKeyOwnersEventToEvent',
    );
  }
}
