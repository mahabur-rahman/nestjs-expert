import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schema/user.schema';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   get all users
  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.findAllUsers();
    return users;
  }

  // Get current user profile
  @Get('me')
  async getProfile(@Req() req) {
    return this.userService.getProfile(req.user);
  }
}
