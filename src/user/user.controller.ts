import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // signup user
  @Post('/signup')
  signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    return this.userService.signUp(signUpDto);
  }

  // Login user
  @Post('/login')
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string; user: any }> {
    return this.userService.login(loginDto, response);
  }
}
