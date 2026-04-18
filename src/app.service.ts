import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './database/entities/book.entity';
import { Review } from './database/entities/review.entity';

type ReviewWithUserAndBook = {
  userName: string;
  bookTitle: string;
  rating: number;
  comment: string | null;
};

type BookReviewCount = {
  title: string;
  author: string;
  reviewCount: number;
};

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getReviewsWithUserNamesAndBookTitles(): Promise<ReviewWithUserAndBook[]> {
    const rows = await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoin('review.user', 'user')
      .innerJoin('review.book', 'book')
      .select('user.name', 'userName')
      .addSelect('book.title', 'bookTitle')
      .addSelect('review.rating', 'rating')
      .addSelect('review.comment', 'comment')
      .getRawMany<ReviewWithUserAndBook>();

    return rows.map((row) => ({
      ...row,
      rating: Number(row.rating),
    }));
  }

  async getBooksWithReviewCounts(): Promise<BookReviewCount[]> {
    const rows = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoin('book.reviews', 'review')
      .select('book.title', 'title')
      .addSelect('book.author', 'author')
      .addSelect('COUNT(review.id)', 'reviewCount')
      .groupBy('book.id')
      .addGroupBy('book.title')
      .addGroupBy('book.author')
      .getRawMany<BookReviewCount>();

    return rows.map((row) => ({
      ...row,
      reviewCount: Number(row.reviewCount),
    }));
  }
}
