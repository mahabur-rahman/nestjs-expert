import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  // find all categories
  async findAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find().populate('user').exec();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('No categories found.');
    }

    return categories;
  }

  // find single categories
  async findById(id: string) {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException(`category not found id: ${id}`);
    }

    return category;
  }

  // update category
  async updateCategory(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
  }

  // delete category
  async deleteCategory(id: string) {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedCategory) {
      throw new NotFoundException(`Category not found with id: ${id}`);
    }

    return deletedCategory;
  }
}
