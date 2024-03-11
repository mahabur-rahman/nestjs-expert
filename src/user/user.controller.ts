import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schema/user.schema';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('users')
// swagger setup
@ApiTags('Access User Endpoint')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   get all users
  @Get()
  @UseGuards(AuthGuard())
  // swagger setup
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'All Users!' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized!' })
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.findAllUsers();
    return users;
  }

  // Get current user profile
  @Get('me')
  // swagger setup
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Get User Profile!' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized!' })
  async getProfile(@Req() req) {
    return this.userService.getProfile(req.user);
  }
}
