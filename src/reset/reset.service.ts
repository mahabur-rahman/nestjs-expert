import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reset } from './schemas/reset.schema';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ResetService {
  constructor(
    @InjectModel(Reset.name)
    private resetModel: Model<Reset>,
    private readonly mailService: MailerService,
  ) {}

  async save(body) {
    return this.resetModel.create(body);
  }

  // reset password
  async findOne(options) {
    return this.resetModel.findOne(options);
  }
}
