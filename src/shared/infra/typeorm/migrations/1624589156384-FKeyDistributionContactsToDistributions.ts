import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class FKeyDistributionContactsToDistributions1624589156384 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createForeignKey(
            'distribution_contacts',
            new TableForeignKey({
              name: 'FKeyDistributionContactsToDistributions',
              columnNames: ['distribution_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'distributions',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('distribution_contacts', 'FKeyDistributionContactsToDistributions');
    }
}
