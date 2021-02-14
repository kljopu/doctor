import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt";
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from "@nestjs/config"
import { LocalStrategy } from "./local.strategy";
import { JwtAuthGuard } from "./jwt.guard";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.dev.env'
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard
  ],
  controllers: [AuthController]
})
export class AuthModule { }
