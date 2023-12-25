import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: mongoose.Model<Category>,
  ) {}

  // create category if user login
  async createCategory(category: Category, user: User) {
    const data = Object.assign(category, { user: user._id });
    const newCategory = await this.categoryModel.create(data);
    return newCategory;
  }
}
