import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './schema/user.schema';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //   signup user
  async signUp(signUpDto: SignUpDto): Promise<{ user: any; token: string }> {
    const { name, email, password } = signUpDto;

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException(
        'Email already in use.Please try another valid email!',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: newUser._id });
    return { user: newUser, token };
  }

  // login user
  async login(loginDto: LoginDto): Promise<{ token: string; user: any }> {
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

    // Omitting the password field from the user object
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    return { user: userWithoutPassword, token };
  }
}
