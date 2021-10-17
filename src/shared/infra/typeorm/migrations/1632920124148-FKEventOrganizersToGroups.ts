import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKEventOrganizersToGroups1632920124148
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'event_organizers',
      new TableForeignKey({
        name: 'FKeyEventOrganizersToGroups',
        columnNames: ['group_id'],
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
      'FKeyEventOrganizersToGroups',
    );
  }
}
