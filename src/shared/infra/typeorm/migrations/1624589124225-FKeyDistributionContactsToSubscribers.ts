import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class FKeyDistributionContactsToSubscribers1624589124225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createForeignKey(
            'distribution_contacts',
            new TableForeignKey({
              name: 'FKeyDistributionContactsToSubscribers',
              columnNames: ['subscriber_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'subscribers',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('distribution_contacts', 'FKeyDistributionContactsToSubscribers');
    }

}
