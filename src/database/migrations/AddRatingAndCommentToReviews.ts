import { MigrationInterface, QueryRunner, TableCheck, TableColumn } from 'typeorm';

export class AddRatingAndCommentToReviews1713400000005
  implements MigrationInterface
{
  name = 'AddRatingAndCommentToReviews1713400000005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('reviews', [
      new TableColumn({
        name: 'rating',
        type: 'int',
        isNullable: false,
      }),
      new TableColumn({
        name: 'comment',
        type: 'text',
        isNullable: true,
      }),
    ]);

    await queryRunner.createCheckConstraint(
      'reviews',
      new TableCheck({
        name: 'CHK_reviews_rating_range',
        expression: '"rating" >= 1 AND "rating" <= 5',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropCheckConstraint('reviews', 'CHK_reviews_rating_range');
    await queryRunner.dropColumn('reviews', 'comment');
    await queryRunner.dropColumn('reviews', 'rating');
  }
}
