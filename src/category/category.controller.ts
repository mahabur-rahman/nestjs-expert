import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schema/category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // create category if user login
  @Post()
  @UseGuards(AuthGuard())
  async createCategory(
    @Body()
    category: CreateCategoryDto,
    @Req()
    req,
  ): Promise<Category> {
    return this.categoryService.createCategory(category, req.user);
  }
}
