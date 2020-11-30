import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginUserDTO } from './user/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) {}

  @Get('')
  main() {
    return "RCIT SERVER Running~"
  }


  @Post('auth/login')
  async login (@Body() user: LoginUserDTO) {
      return this.authService.login(user);
  }
}
