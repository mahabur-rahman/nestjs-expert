import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BookModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
