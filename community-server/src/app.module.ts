import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from '../../domains';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config"
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      ...ormConfig as any,
      autoLoadEntities: true
    }),
    AuthModule,
    UserModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AuthModule]
})
export class AppModule { }
