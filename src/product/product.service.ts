import { Injectable, NotFoundException } from '@nestjs/common';
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

  // find single product
  async getProductById(productId: string): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(productId);

    if (!isValidId) throw new NotFoundException(`Product id not valid yet.`);

    const product = await this.productModel
      .findById(productId)
      .populate('user')
      .populate('category');

    return product;
  }

  // update product
  async updateProduct(
    productId: string,
    updatedProductData: Partial<Product>,
  ): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(productId);

    if (!isValidId) throw new NotFoundException(`Product id is not valid yet.`);

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(productId, updatedProductData, { new: true })
      .populate('user')
      .populate('category');

    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${productId} not found.`);
    }

    return updatedProduct;
  }
}
