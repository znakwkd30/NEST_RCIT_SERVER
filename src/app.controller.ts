import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './user/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('auth/login')
  async login (@Body() user: LoginUserDto) {
      return this.authService.login(user);
  }
}
