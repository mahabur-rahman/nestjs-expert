import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Review } from './schema/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: mongoose.Model<Review>,
  ) {}

  // create review if user login
  async createReview(createReviewDto: CreateReviewDto, user): Promise<Review> {
    const { ratings, comment, product } = createReviewDto;

    const newReview = await this.reviewModel.create({
      ratings,
      comment,
      product,
      user: user, // Set the user ID from the DTO
    });

    return newReview;
  }

  // findAll review

  async findAllReviews(): Promise<Review[]> {
    const reviews = await this.reviewModel.find().exec();
    return reviews;
  }
}
