import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKEventOrganizersToEvent1632794718007
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'event_organizers',
      new TableForeignKey({
        name: 'FKeyEventOrganizersToEvent',
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
      'FKeyEventOrganizersToEvent',
    );
  }
}
