import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addMetricsColumns1631366534109
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'distributions',
      new TableColumn({
        name: 'engagement_clicks',
        type: 'numeric',
        isNullable: false,
        default: 0,
      }),
    );
    await queryRunner.addColumn(
      'distributions',
      new TableColumn({
        name: 'unsubscribe_clicks',
        type: 'numeric',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('distributions', 'engagement_clicks');
    await queryRunner.dropColumn('distributions', 'unsubscribe_clicks');
  }
}
