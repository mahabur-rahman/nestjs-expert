import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

  // authenticated user
  // authenticated user
  @Get('/me')
  async getAuthenticatedUser(@Req() request: any, @Res() response: Response) {
    try {
      const authenticatedUser = await this.userService.getAuthenticatedUser(
        request,
        response,
      );
      response.status(200).json(authenticatedUser); // Explicitly set status and send response
    } catch (err) {
      console.error('Error in getAuthenticatedUser:', err.message);
      // Handle errors and send an appropriate response
      response.status(500).json({ error: err.message });
    }
  }
}
