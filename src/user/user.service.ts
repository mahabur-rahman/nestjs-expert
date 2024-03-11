import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  // current user profile ================
  async getProfile(user: User) {
    return {
      user,
    };
  }
}
