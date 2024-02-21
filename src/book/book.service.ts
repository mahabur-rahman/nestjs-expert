import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  //   create a book
  async createBook(book: Book): Promise<Book> {
    const data = await this.bookModel.create(book);
    return data;
  }

  // read all books
  async findAll(query: Query): Promise<Book[]> {
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

  //   get single book
  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(`Please enter correct id!`);
    }
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found! like so');
    }
    return book;
  }

  //   update book
  async updateBook(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
    });

    return updatedBook;
  }

  // delete book
  // delete book
  async deleteBook(id: string): Promise<Book | null> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();

    return deletedBook ? deletedBook.value : null;
  }
}
