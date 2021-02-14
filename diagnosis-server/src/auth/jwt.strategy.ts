import { User } from "../../../domains/dist/domains";
import { UserService } from "../user/user.service"
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from "@nestjs/config"
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: any): Promise<User> {
        try {
            const email = payload.email;
            const user: User = await this.userService.findByEmail(email);
            if (user === undefined || null) {
                throw new UnauthorizedException()
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}

