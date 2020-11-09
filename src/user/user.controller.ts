import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    users() {
        return this.userService.users();
    }

    @Post('register')
    register(@Body() user: CreateUserDto) {
        return this.userService.register(user);
    }
}
