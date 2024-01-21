import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ResetService } from './reset.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Controller('reset')
export class ResetController {
  constructor(
    private readonly resetService: ResetService,
    private mailerService: MailerService,
    private userService: UserService,
  ) {}

  // forgot password with send an email
  @Post('/forgot-password')
  async forgot(@Body('email') email: string) {
    const token = Math.random().toString(20).substring(2, 12);

    await this.resetService.save({
      email,
      token,
    });

    const url = `http://localhost:5173/reset/${token}`; // http://127.0.0.1:8025/

    await this.mailerService.sendMail({
      to: email,
      subject: `Reset your password`,
      html: `Click <a href="${url}">here</a> to reset your password`,
    });

    return {
      message: 'Check your email',
    };
  }

  // reset password
  @Post('/reset-password')
  async reset(
    @Body('token') token: string,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Password not match!');
    }

    const reset = await this.resetService.findOne({ token });
    // console.log('reset : ', reset);

    const user = await this.userService.findOne({ email: reset.email });
    // console.log('user : ', user);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.userService.updatePassword(user._id, {
      password: await bcrypt.hash(password, 12),
    });

    return {
      message: 'Password reset successful!',
    };
  }
}
