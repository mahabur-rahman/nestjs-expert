import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  // signup user
  async signUp(signUpDto: SignUpDto): Promise<{ user: any; token: string }> {
    const { firstName, lastName, email, password } = signUpDto;

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException(
        'Email already in use.Please try another valid email!',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: newUser._id });
    return { user: newUser, token };
  }

  async login(
    loginDto: LoginDto,
    response: Response,
  ): Promise<{ token: string; user: any }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid email or password!');
    }

    const token = this.jwtService.sign({ id: user._id });

    // Set the cookie in the response
    response.cookie('refreshToken', token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    return { user: userWithoutPassword, token };
  }
}
