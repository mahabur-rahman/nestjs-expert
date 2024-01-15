import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookDto } from './dto/create.book.dto';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // create a book
  @Post()
  async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    return this.bookService.createBook(book, req.user);
  }

  // read all books
  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }
}
