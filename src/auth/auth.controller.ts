import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
// swagger setup
@ApiTags('authentication for user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // signup user
  @Post('signup')
  // swagger setup
  @ApiCreatedResponse({ description: 'User has successfully created!' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  // login user
  @Post('login')
  // swagger setup
  @ApiCreatedResponse({ description: 'User has successfully loggedIn!' })
  @ApiForbiddenResponse({ description: 'Something went wrong!' })
  login(
    @Body()
    loginDto: LoginDto,
  ): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
