import { Body, Controller, Post } from '@nestjs/common';
import { ResetService } from './reset.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('reset')
export class ResetController {
  constructor(
    private readonly resetService: ResetService,
    private mailerService: MailerService,
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
}
