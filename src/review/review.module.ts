import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './ReviewController';
import { ReviewSchema } from './schema/review.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
