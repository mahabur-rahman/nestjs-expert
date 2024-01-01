import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schema/review.schema';
import mongoose from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: mongoose.Model<Review>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { ratings, comment, product } = createReviewDto;

    const newReview = new this.reviewModel({
      ratings,
      comment,
      product,
    });

    return newReview.save();
  }
}
