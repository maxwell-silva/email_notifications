import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class FKDistributionToViews1633580486907
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'distributions',
      new TableForeignKey({
        name: 'FKeyDistributionToViews',
        columnNames: ['view_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'views',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'distributions',
      'FKeyDistributionToViews',
    );
  }
}
