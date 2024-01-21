import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from './schemas/token.schema';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<Token>,
    private jwtService: JwtService,
  ) {}

  async save(body) {
    return this.tokenModel.create(body);
  }

  async findOne(options) {
    return this.tokenModel.findOne(options);
  }

  async delete(options) {
    return this.tokenModel.deleteOne(options);
  }
}
