import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: mongoose.Model<Product>,
  ) {}

  // create product if user login
  async createProduct(product: Product, user: User) {
    const data = Object.assign(product, { user: user._id });
    const newProduct = await this.productModel.create(data);
    return newProduct;
  }

  // find all products
  async getAllProducts() {
    return this.productModel.find().populate('user').populate('category');
  }
}
