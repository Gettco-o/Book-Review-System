import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { Review } from './entities/review.entity';
import { User } from './entities/user.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'book_review_system',
  entities: [User, Book, Review],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
});
