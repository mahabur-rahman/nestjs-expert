import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // create review if user login
  @Post()
  @UseGuards(AuthGuard())
  async createReview(
    @Body()
    createReviewDto: CreateCategoryDto,
  ) {
    return this.reviewService.createReview(createReviewDto);
  }
}
