import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('queries/reviews')
  getReviewsWithUserNamesAndBookTitles() {
    return this.appService.getReviewsWithUserNamesAndBookTitles();
  }

  @Get('queries/books')
  getBooksWithReviewCounts() {
    return this.appService.getBooksWithReviewCounts();
  }
}
