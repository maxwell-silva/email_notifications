import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class alterColumnSubscriberIdToNull1625418789125
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'distribution_contacts',
      'subscriber_id',
      new TableColumn({
        name: 'subscriber_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'distribution_contacts',
      'subscriber_id',
      new TableColumn({
        name: 'subscriber_id',
        type: 'uuid',
        isNullable: false,
      }),
    );
  }
}
