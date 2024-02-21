import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // create a book
  @Post('/create')
  @UseGuards(AuthGuard())
  async createBook(@Body() book: CreateBookDto, @Req() req) {
    return this.bookService.createBook(book, req.user);
  }

  // read all books
  @Get()
  async getAllBooks(
    @Query()
    query: ExpressQuery,
  ): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  // get single book
  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  // update book
  @Put(':id')
  async updateSingleBook(
    @Param('id')
    id: string,
    @Body()
    book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, book);
  }

  // delete book
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteBook(id);
  }
}
