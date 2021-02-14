import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domains/dist/domains';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email)
        if (!user.checkPassword(password)) {
            throw new BadRequestException("Password Not Matched")
        }
        return user
    }

    async createUser(registerInput): Promise<any> {
        try {
            console.log(registerInput);
            const { email, name, password, role } = registerInput
            const exists = await this.users.findOne({ email })
            if (exists) throw new BadRequestException("User Already exists")
            const user = await this.users.save(
                this.users.create({ email, name, password, role })
            ).catch((r) => {
                console.log(r);
            })
            return user
        } catch (error) {
            return error
        }
    }

    async login(input): Promise<any> {
        try {
            const { email, password } = input;
            const user: User = await this.userService.findByEmail(email);
            if (await user.checkPassword(password) != true) throw new UnauthorizedException();
            const payload = { email: user.email, id: user.id, role: user.role };
            const accessToken = await this.jwtService.sign(
                payload,
                {
                    secret: this.configService.get("JWT_SECRET"),
                    expiresIn: '7d'
                }
            )
            return { access_token: accessToken }
        } catch (error) {
            return error
        }
    }
}
