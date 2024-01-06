import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // create review if user login
  @Post()
  @UseGuards(AuthGuard())
  async createProduct(
    @Body()
    createReviewDto: CreateReviewDto,
    @Req()
    req,
  ) {
    return this.reviewService.createReview(createReviewDto, req.user);
  }
}
