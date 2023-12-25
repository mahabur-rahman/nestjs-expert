import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   get all users

  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.findAllUsers();
    return users;
  }

  // get single user
  @Get(':id')
  @UseGuards(AuthGuard())
  async getUserById(
    @Param('id')
    id: string,
  ): Promise<User> {
    return await this.userService.findUserById(id);
  }

  // update user

  // delete user

  // current user profile =================
}
