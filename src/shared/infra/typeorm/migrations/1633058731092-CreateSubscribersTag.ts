import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSubscribersTag1633058731092
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subscribers_tag',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'subscription_status',
            type: 'boolean',
            default: true,
          },
          {
            name: 'subscriber_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'tag_id',
            type: 'uuid',
            isNullable: true,
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
    await queryRunner.createForeignKey(
      'subscribers_tag',
      new TableForeignKey({
        name: 'FKeySubscribersTagToTags',
        columnNames: ['tag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'subscribers_tag',
      new TableForeignKey({
        name: 'FKeySubscribersTagToSubscribers',
        columnNames: ['subscriber_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'subscribers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'subscribers_tag',
      'FKeySubscribersTagToTags',
    );
    await queryRunner.dropForeignKey(
      'subscribers_tag',
      'FKeySubscribersTagToSubscribers',
    );
    await queryRunner.dropTable('subscribers_tag');
  }
}
