import * as jsonwebtoken from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDTO } from '../user/dto/login-user.dto';
import { LoginResponse } from '../user/types/login.response.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    async createToken(id) {
        const secret = this.configService.get('JWT_SECRET');

        const payload = {
            id
        };

        const option = {
            expiresIn: '60 days',
        };

        try {
            const result = await jsonwebtoken.sign(payload, secret, option);
            return result;
        } catch (error) {
            console.log(`[TOKEN] 토큰 발급 중 오류`);
        }
    }

    async validateUser(id: string) {
        const user = await this.userService.getUser(id);

        if (user) {
            const { ...result } = user;

            return result;
        }

        return null;
    }

    async login(user: LoginUserDTO): Promise<LoginResponse> {
        try {
            const token = await this.createToken(user.id);

            return {
                token
            };
        } catch (error) {
            console.log("Token 발생 후 예상치 못한 오류 발생된 것으로 추정");
        }
    }
}
