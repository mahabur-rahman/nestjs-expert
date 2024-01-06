import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Review } from './schema/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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
    const reviews = await this.reviewModel
      .find()
      .populate({
        path: 'product',
        populate: {
          path: 'category', // Specify the field to populate inside the Product object
          model: 'Category', // Assuming 'Category' is the model name for the category schema
        },
      })
      .exec();
    return reviews;
  }

  // find one review
  async findOneReview(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  // update review
  async updateReview(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const existingReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();

    if (!existingReview) {
      throw new NotFoundException('Review not found');
    }

    return existingReview;
  }

  // delete review
  async deleteReview(id: string): Promise<Review> {
    const reviewToDelete = await this.reviewModel.findById(id).exec();

    if (!reviewToDelete) {
      throw new NotFoundException('Review not found');
    }

    const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();

    if (!deletedReview) {
      throw new NotFoundException('Review not found');
    }

    return reviewToDelete.toObject(); // Return the deleted review
  }
}
