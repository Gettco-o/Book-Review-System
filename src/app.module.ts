import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './database/entities/book.entity';
import { Review } from './database/entities/review.entity';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([Book, Review])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
