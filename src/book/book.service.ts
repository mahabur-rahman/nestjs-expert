import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { Roles, User } from 'src/auth/schemas/user.schema';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  //   create a book
  async createBook(book: Book, user: User): Promise<Book> {
    // Check if the user has the "ADMIN" role
    if (!user.roles.includes(Roles.ADMIN)) {
      throw new ForbiddenException('Only ADMIN users can create a book');
    }

    // Combine the book data with the user information
    const data = Object.assign(book, { user: user });

    // Create a new book
    const newBook = await this.bookModel.create(data);
    return newBook;
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
}
