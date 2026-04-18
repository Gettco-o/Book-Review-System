import { MigrationInterface, QueryRunner, TableColumn, TableUnique } from 'typeorm';

export class AddEmailAndUpdatedAtToUsers1713400000003
  implements MigrationInterface
{
  name = 'AddEmailAndUpdatedAtToUsers1713400000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'email',
        type: 'varchar',
        length: '255',
        isNullable: false,
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        isNullable: false,
        default: 'CURRENT_TIMESTAMP',
      }),
    ]);

    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({
        name: 'UQ_users_email',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('users', 'UQ_users_email');
    await queryRunner.dropColumn('users', 'updated_at');
    await queryRunner.dropColumn('users', 'email');
  }
}
