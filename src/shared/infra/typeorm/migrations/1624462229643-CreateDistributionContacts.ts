import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDistributionContacts1624462229643
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'distribution_contacts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'distribution_id',
            type: 'uuid',
          },
          {
            name: 'subscriber_id',
            type: 'uuid',
          },
          {
            name: 'delivery_status',
            type: 'boolean',
          },
          {
            name: 'unsubscription',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('distribution_contacts');
  }
}
