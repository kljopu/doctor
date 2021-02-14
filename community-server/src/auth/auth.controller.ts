import { Controller, UseGuards, Get, Post, Res, Req, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local.guard';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(
        @Body() registerInput: any,
        @Req() req,
        @Res() res
    ): Promise<any> {
        try {
            const input = req.body.input
            const result = await this.authService.createUser(registerInput)
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.json(error).status(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(JwtStrategy)
    @Post('login')
    async login(
        @Req() req,
        @Res() res,
    ) {
        try {
            const input = req.body.input
            const result = await this.authService.login(input)
            return res.status(HttpStatus.ACCEPTED).json(result)
        } catch (error) {
            return res.json(error).status(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
