import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // create product if user login
  @Post()
  @UseGuards(AuthGuard())
  async createProduct(
    @Body()
    createProductDto: CreateProductDto,
    @Req()
    req,
  ) {
    return this.productService.createProduct(createProductDto, req.user);
  }

  // find all products
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  // find single product
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }
}
