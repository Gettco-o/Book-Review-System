import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldsToBooks1713400000004 implements MigrationInterface {
  name = 'AddFieldsToBooks1713400000004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('books', [
      new TableColumn({
        name: 'author',
        type: 'varchar',
        length: '255',
        isNullable: false,
      }),
      new TableColumn({
        name: 'published_year',
        type: 'int',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('books', 'published_year');
    await queryRunner.dropColumn('books', 'author');
  }
}
