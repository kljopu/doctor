import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ormConfig } from '../../domains';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(ormConfig as any)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
