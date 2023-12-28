import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly categoryModel: mongoose.Model<Product>,
  ) {}

  // create product if user login
  async createProduct(product: Product, user: User) {
    const data = Object.assign(product, { user: user._id });
    const newProduct = await this.categoryModel.create(data);
    return newProduct;
  }
}
