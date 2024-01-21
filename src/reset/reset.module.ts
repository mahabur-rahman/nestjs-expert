import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResetSchema } from './schemas/reset.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reset', schema: ResetSchema }]),

    MailerModule.forRoot({
      transport: {
        host: '0.0.0.0', // http://127.0.0.1:8025/
        port: 1025,
      },
      defaults: {
        from: 'from@example.com',
      },
    }),
    UserModule,
  ],
  controllers: [ResetController],
  providers: [ResetService],
})
export class ResetModule {}
