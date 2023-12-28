import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
