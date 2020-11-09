import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(id: string, pass: string) {
        const user = await this.userService.getUser(id);
        const valid = await bcrypt.compare(pass, user.password);

        if (valid) {
            return user;
        }

        return null;
    }

    async login(user: User) {
        const payload = { id: user.id };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
