import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcryptjs';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
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
  @Get('/me')
  async getAuthenticatedUser(@Req() request: any, @Res() response: Response) {
    try {
      const authenticatedUser = await this.userService.getAuthenticatedUser(
        request,
        response,
      );
      response.status(200).json(authenticatedUser);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }

  // refresh token
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const refreshToken = request.cookies['refreshToken'];

      const { id } = await this.jwtService.verifyAsync(refreshToken);

      // generate access token
      const accessToken = await this.jwtService.signAsync(
        { id },
        { expiresIn: '30s' },
      );

      // revoking token
      const revokingToken = await this.tokenService.findOne({
        userId: id,
        expiredAt: { $gte: new Date() },
      });

      if (!revokingToken) {
        throw new UnauthorizedException();
      }

      return {
        token: accessToken,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  // logout
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const refreshToken = request.cookies['refreshToken'];
      await this.tokenService.delete({ token: refreshToken });

      response.clearCookie('refreshToken');
      return {
        message: 'Logout successful!',
      };
    } catch (error) {
      return {
        message: 'Internal server error during logout.',
      };
    }
  }

  // google auth go to ( https://cloud.google.com/)
  @Post('google-auth')
  async googleAuth(
    @Body('token') token: string, // from google token
    @Res({ passthrough: true }) response: Response,
  ) {
    const clientId =
      '531166191676-deismoet67d6ajnm8plrtc6r8v8pe6ct.apps.googleusercontent.com';
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const googleUser = ticket.getPayload(); // payload

    if (!googleUser) {
      throw new UnauthorizedException();
    }

    let user = await this.userService.findOne({ email: googleUser.email });

    if (!user) {
      user = await this.userService.save({
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        email: googleUser.email,
        password: await bcrypt.hash(token, 12),
      });
    }

    const accessToken = this.jwtService.sign({ id: user._id });

    // revoking token in db when login
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);

    await this.tokenService.save({
      userId: user._id,
      token: accessToken,
      expiredAt,
    });

    // status code change
    response.status(200);

    // Set the cookie in the response
    response.cookie('refreshToken', accessToken, {
      httpOnly: true,
      maxAge: 3600000,
    });

    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    return { user: userWithoutPassword, accessToken };
  }
}
