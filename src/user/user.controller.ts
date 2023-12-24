import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   get all users
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  // get single user

  // update user

  // delete user
}
