import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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

  // findAll review
  @Get()
  async findAllReviews() {
    return this.reviewService.findAllReviews();
  }

  // find one Review
  @Get(':id')
  async findOneReview(@Param('id') id: string) {
    return this.reviewService.findOneReview(id);
  }

  // update review
  @Put(':id')
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  // delete review

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
