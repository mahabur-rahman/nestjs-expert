import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // signup user
  @Post('signup')
  signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  // login user
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.signIn(loginDto);
  }
}
