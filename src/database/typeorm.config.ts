import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Review } from './entities/review.entity';
import { User } from './entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Book, Review],
  migrations: ['dist/database/migrations/*.js'],
  autoLoadEntities: false,
  synchronize: false,
};
