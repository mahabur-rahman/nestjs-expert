import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  //   get all users
  async findAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  // get single user
  async findUserById(userId: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(userId);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }

    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  // current user profile ================

  // update user

  // delete user
}
