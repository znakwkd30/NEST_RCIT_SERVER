import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants().secret,
        });
    }

    // controller에 JwtGuard 데코레이터가 붙은 메서드는 여기서 검증후 처리
    async validate(payload: any) {
        const user = await this.authService.validateUser(payload.id);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user.id;
    }
}