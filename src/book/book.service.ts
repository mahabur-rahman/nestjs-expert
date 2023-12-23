import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: mongoose.Model<Book>,
  ) {}
  //   get all books
  async findAll(query: Query): Promise<Book[]> {
    console.log(query);

    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  // create a book
  async createBook(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    const newBook = await this.bookModel.create(data);
    return newBook;
  }

  // get single book
  async findById(id: string) {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException(`Book not found id: ${id}`);
    }

    return book;
  }

  // update book
  async updateBook(id: string, book: Book): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  // delete book
  async deleteSingleBok(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Book not found with id: ${id}`);
    }

    return deletedBook;
  }
}
