import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schema/category.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  // find all categories
  @Get()
  @UseGuards(AuthGuard())
  async findAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }

  // find single categories
  @Get(':id')
  async getSingleCategory(
    @Param('id')
    id: string,
  ): Promise<Category> {
    return this.categoryService.findById(id);
  }

  // update category
  @Put(':id')
  async updateCategory(
    @Param('id')
    id: string,
    @Body()
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
}
